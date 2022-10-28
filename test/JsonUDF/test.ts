import { expect } from "chai";
import { JsonFilterKeysUDF } from "../../src/JsonUDF/JsonFilterKeys";
import { JsonExcludeNullUDF } from "../../src/JsonUDF/JsonExcludeNull";
import { JsonMergeUDF } from "../../src/JsonUDF/JsonMerge";

const TESTDATA = JSON.stringify({
    "c1": "v1",
    "c2": "v2",
    "null_1": null,
    "null_2": null,
    "array_1": ["v1", "v2", null],
    "array_2": ["v1", "v2", "v3"],
    "nested_1": {
        "c1": "v1",
        "c2": null
    },
    "nested_2": {
        "c1": "v1",
        "c2": null,
        "c3": {
            "c1": null,
            "c2": "v2"
        }
    }
});

describe("JsonFilterKeysUDF", () => {
    const f = JsonFilterKeysUDF.getInstance();
    let keys = ["c1", "null_1", "array_1", "nested_2"];

    it("Include Keys", () => {
        let tin = {json: TESTDATA, keys: keys, include: true};
        let res = JSON.parse(String(f.transform(tin)));
        expect(res).to.eql({
            "c1": "v1",
            "null_1": null,
            "array_1": ["v1", "v2", null],
            "nested_2": {
                "c1": "v1",
                "c2": null,
                "c3": {
                    "c1": null,
                    "c2": "v2"
                }
            }
        });
    })

    it("Exclude Keys", () => {
        let tin = {json: TESTDATA, keys: keys, include: false};
        let res = JSON.parse(String(f.transform(tin)));
        expect(res).to.eql({
            "c2": "v2",
            "null_2": null,
            "array_2": ["v1", "v2", "v3"],
            "nested_1": {
                "c1": "v1",
                "c2": null
            }
        });
    })
})

describe("JsonExcludeNullUDF", () => {
    const f = JsonExcludeNullUDF.getInstance();

    it("Exclude Null Values", () => {
        let tin: String = TESTDATA
        let res = JSON.parse(String(f.transform(tin)));
        expect(res).to.eql({
            "c1": "v1",
            "c2": "v2",
            "array_1": ["v1", "v2"],
            "array_2": ["v1", "v2", "v3"],
            "nested_1": {
                "c1": "v1",
            },
            "nested_2": {
                "c1": "v1",
                "c3": {
                    "c2": "v2"
                }
            }
        });
    })
})

describe("JsonMergeUDF", () => {
    const f = JsonMergeUDF.getInstance();
    const toBeMerged = JSON.stringify({
        "c3": "v3",
        "nested_2": {
            "c4": "v4",
        }
    })

    it("Merge", () => {
        let tin = {json1: TESTDATA, json2: toBeMerged};
        let res = JSON.parse(String(f.transform(tin)));

        expect(res).to.eql({
            "c1": "v1",
            "c2": "v2",
            "c3": "v3",
            "null_1": null,
            "null_2": null,
            "array_1": ["v1", "v2", null],
            "array_2": ["v1", "v2", "v3"],
            "nested_1": {
                "c1": "v1",
                "c2": null
            },
            "nested_2": {
                "c1": "v1",
                "c2": null,
                "c3": {
                    "c1": null,
                    "c2": "v2"
                },
                "c4": "v4"
            }
        });
    })
})
