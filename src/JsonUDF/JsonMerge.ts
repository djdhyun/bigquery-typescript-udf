import { BaseUDF } from '../common/BaseUDF';
import { serializeJsonObj } from '../common/Utils';

type InputType = {
    json1: string,
    json2: string
}

// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
}

export class JsonMergeUDF extends BaseUDF<InputType, String> {
    private static instance: JsonMergeUDF;
    public static getInstance(): JsonMergeUDF {
        if (!JsonMergeUDF.instance) {
            JsonMergeUDF.instance = new JsonMergeUDF();
        }
        return JsonMergeUDF.instance;
    }

    public transformer(row: InputType): String {
        let obj1 = JSON.parse(row.json1);
        let obj2 = JSON.parse(row.json2);
        let res = mergeDeep(obj1, obj2);

        return serializeJsonObj(res);
    }
}
