import { HelloWorldUDF } from './Example/HelloWorld';
import { JsonExcludeNullUDF } from './JsonUDF/JsonExcludeNull';
import { JsonFilterKeysUDF } from './JsonUDF/JsonFilterKeys';
import { JsonMergeUDF } from './JsonUDF/JsonMerge';

export function helloWorldUDF(row: object): object {
    return HelloWorldUDF.getInstance().transform(row);
}

export function jsonExcludeNull(json: string): string {
    return String(JsonExcludeNullUDF.getInstance().transform(Object(json)));
}

export function jsonFilterKeys(json: string, keys: string[], include: boolean): string {
    let argObj = {
        json: json,
        keys: keys,
        include: include
    }
    return String(JsonFilterKeysUDF.getInstance().transform(argObj));
}

export function jsonMerge(json1: string, json2: string): string {
    let argObj = { json1: json1, json2: json2 }
    return String(JsonMergeUDF.getInstance().transform(argObj));
}
