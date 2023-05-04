# BigQuery UDF with TypeScript

(This repository is a derivative work based on [bigquery-udf-typescript](https://github.com/hotoku/bigquery-udf-typescript) by [hotoku](https://github.com/hotoku).)


## With this repository you can..

* Develop a BigQuery UDF from a code base written in typescript that allows you to define somewhat complicated behavior.
* Make BigQuery UDFs equivalent to [UDAF](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF#LanguageManualUDF-Built-inAggregateFunctions(UDAF))/[UDTF](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF#LanguageManualUDF-Built-inTable-GeneratingFunctions(UDTF)) of Hive.
* Test UDFs in both of Typescript level and SQL level.
* Bundle and Deploy UDFs to GCS and as persistent BigQuery functions.


## Dependencies

* node
* jinja2-cli
  * `brew install jinja2-cli`
* google-cloud-sdk (`gsutil, bq`)


## Workflows

* `make prepare` : Setup dev env
* `make build` : Bundle scripts into `dist/${target}.js` using webpack
* `make test` : Run test code
* `make test-sql` : Run test BigQuery SQLs
* `make deploy-to-${env}`
    * Upload the bundled js into the GCS bucket.
    * Create persistent BigQuery functions by running SQLs in the `export` directory.
* `make deploy-commit`
    * Upload the bundled js into the GCS bucket to the path containing a commit sha string.


## Sample UDFs
* [JsonMerge](#jsonmergejson1-string-json2-string---string)
* [JsonFilterKeys](#jsonexcludenulljson-string---string)
* [JsonExcludeNull](#jsonfilterkeysjson-string-keys-array-include-bool---string)


### [JsonMerge(json1 STRING, json2 STRING) -> String](src/JsonUDF/JsonMerge.ts)

```sql
SELECT JsonMerge('{"k1": "v1"}', '{"k2": "v2"}');

# result: {"k1":"v1","k2":"v2"}
```

### [JsonExcludeNull(json STRING) -> String](src/JsonUDF/JsonExcludeNull.ts)

```sql
SELECT
    JsonExcludeNull('{"k1": "v1", "k2": null}'),
    JsonExcludeNull('{"k1": "v1", "k2": null, "k3": ["a", "b", null]}');

# result
# {"k1":"v1"}
# {"k1":"v1","k3":["hi","hello"]}
```

### [JsonFilterKeys(json STRING, keys ARRAY<STRING>, include BOOL) -> String](src/JsonUDF/JsonExcludeNull.ts)

```sql
SELECT
    JsonFilterKeys('{"k1": "v1", "k2": null, "k3": "v3"}', ["k1", "k2"], true),
    JsonFilterKeys('{"k1": "v1", "k2": null, "k3": "v3"}', ["k1", "k2"], false);

# result
# {"k1":"v1","k2":null}
# {"k3":"v3"}
```
