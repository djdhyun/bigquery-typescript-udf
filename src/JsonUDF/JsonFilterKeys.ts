import { BaseUDF } from '../common/BaseUDF';
import { serializeJsonObj } from '../common/Utils';

type InputType = {
    json: string,
    keys: string[],
    include: boolean
}

export class JsonFilterKeysUDF extends BaseUDF<InputType, String> {
    private static instance: JsonFilterKeysUDF;
    public static getInstance(): JsonFilterKeysUDF {
        if (!JsonFilterKeysUDF.instance) {
            JsonFilterKeysUDF.instance = new JsonFilterKeysUDF();
        }
        return JsonFilterKeysUDF.instance;
    }

    public transformer(row: InputType): String {
        let jobj = JSON.parse(row.json);
        let ekeys = Object.keys(jobj).filter(k => (row.keys.includes(k) == row.include) );
        let ret = ekeys.reduce((obj, k) => Object.assign(obj, { [k]: jobj[k] }), {});

        return serializeJsonObj(ret);
    }
}
