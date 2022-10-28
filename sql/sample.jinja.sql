-- UDF with record type
CREATE TEMP FUNCTION helloUDF(word STRING, n INT64, ts TIMESTAMP)
RETURNS STRUCT<res STRING, n INT64>
LANGUAGE js AS
"""
{% include "udf.js" %}
return udf.helloWorldUDF({word: word, n: n, ts: ts});
""";

SELECT helloUDF("hi", 10, CURRENT_TIMESTAMP());

-- UDF with arguments (arg1, arg2, ...)
CREATE TEMP FUNCTION helloRecordUDF(node STRUCT<
	word STRING, n INT64, ts TIMESTAMP
>) RETURNS STRUCT<res STRING, n INT64>
LANGUAGE js AS
"""
{% include "udf.js" %}
return udf.helloWorldUDF(node);
""";

SELECT helloRecordUDF(("hi", 10, CURRENT_TIMESTAMP()));
