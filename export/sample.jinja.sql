-- UDF with record type
CREATE OR REPLACE FUNCTION {{ dataset }}.HelloUDF(word STRING, n INT64, ts TIMESTAMP)
RETURNS STRUCT<res STRING, n INT64>
LANGUAGE js
OPTIONS (library=["{{ gcs_path }}/{{ target }}"])
AS """
return udf.helloWorldUDF({word: word, n: n, ts: ts});
""";

SELECT {{ dataset }}.HelloUDF("hi", 10, CURRENT_TIMESTAMP());

-- UDF with arguments (arg1, arg2, ...)
CREATE OR REPLACE FUNCTION {{ dataset }}.HelloRecordUDF(node STRUCT<
	word STRING, n INT64, ts TIMESTAMP
>) RETURNS STRUCT<res STRING, n INT64>
LANGUAGE js
OPTIONS (library=["{{ gcs_path }}/{{ target }}"])
AS """
return udf.helloWorldUDF(node);
""";

SELECT {{ dataset }}.HelloRecordUDF(("hi", 10, CURRENT_TIMESTAMP()));
