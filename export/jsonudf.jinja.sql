CREATE OR REPLACE FUNCTION {{ dataset }}.JsonMerge(json1 STRING, json2 STRING) RETURNS STRING
LANGUAGE js
OPTIONS (library=["{{ gcs_path }}/{{ target }}"])
AS """
return udf.jsonMerge(json1, json2);
""";

CREATE OR REPLACE FUNCTION {{ dataset }}.JsonExcludeNull(json STRING) RETURNS STRING
LANGUAGE js
OPTIONS (library=["{{ gcs_path }}/{{ target }}"])
AS """
return udf.jsonExcludeNull(json);
""";

CREATE OR REPLACE FUNCTION {{ dataset }}.JsonFilterKeys(json STRING, keys ARRAY<STRING>, include BOOLEAN) RETURNS STRING
LANGUAGE js
OPTIONS (library=["{{ gcs_path }}/{{ target }}"])
AS """
return udf.jsonFilterKeys(json, keys, include);
""";
