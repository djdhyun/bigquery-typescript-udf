.PHONY: prepare install build test clean

GCS_PATH := ${YOUR_GCS_PATH}
TARGET := ${BUNDLE_NAME}-udf.js
DATASET := ${YOUR_DATASET}
SQL_TEMPLATES := $(wildcard sql/*.jinja.sql)
EXPORT_TEMPLATES := $(wildcard export/*.jinja.sql)
BQ := bq query --use_legacy_sql=false

prepare:
	npm i

install:
	npm i
	python -mpip install jinja2-cli

build:
	npm run build

test:
	npm run test

clean:
	rm -rf dist/*

.PHONY: test-sql
test-sql: build $(SQL_TEMPLATES)
	cp dist/${TARGET} sql/${TARGET}
	@for f in $(SQL_TEMPLATES); do jinja2 $${f} | $(BQ); done
	rm sql/${TARGET}

.PHONY: deploy
deploy-to-prod: build $(EXPORT_TEMPLATES)
	gsutil cp dist/$(TARGET) gs://$(GCS_PATH)/$(TARGET)
	@for f in $(EXPORT_TEMPLATES); do jinja2 -Dgcs_path=$(GCS_PATH) -Dtarget=$(TARGET) -Ddataset=$(DATASET) $${f} | $(BQ); done
