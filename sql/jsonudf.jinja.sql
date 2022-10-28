CREATE TEMP FUNCTION jsonMerge(json1 STRING, json2 STRING) RETURNS STRING
LANGUAGE js AS
"""
{% include "udf.js" %}
return udf.jsonMerge(json1, json2);
""";

CREATE TEMP FUNCTION jsonExcludeNull(json STRING) RETURNS STRING
LANGUAGE js AS
"""
{% include "udf.js" %}
return udf.jsonExcludeNull(json);
""";

CREATE TEMP FUNCTION jsonFilterKeys(json STRING, keys ARRAY<STRING>, include BOOLEAN)
RETURNS STRING
LANGUAGE js AS
"""
{% include "udf.js" %}
return udf.jsonFilterKeys(json, keys, include);
""";


SELECT
    jsonMerge('{"k1": "v1"}', '{"k2": "v2"}'),
    jsonExcludeNull('{"k1": "v1", "k2": null}'),
    jsonFilterKeys('{"k1": "v1", "k2": null, "k3": "v3"}', ["k1", "k2"], true),
    jsonFilterKeys('{"k1": "v1", "k2": null, "k3": "v3"}', ["k1", "k2"], false)
