import { BaseUDF } from '../common/BaseUDF';
import { serializeJsonObj } from '../common/Utils';

export class JsonExcludeNullUDF extends BaseUDF<String, String> {
    private static instance: JsonExcludeNullUDF;
    public static getInstance(): JsonExcludeNullUDF {
        if (!JsonExcludeNullUDF.instance) {
            JsonExcludeNullUDF.instance = new JsonExcludeNullUDF();
        }
        return JsonExcludeNullUDF.instance;
    }

    private removeEmpty(obj) {
        if (Array.isArray(obj)) {
            return obj.filter(v => v != null)
                .map(v => v === Object(v) ? this.removeEmpty(v) : v)
        } else {
            return Object.entries(obj)
                .filter(([_, v]) => v != null)
                .reduce(
                    (acc, [k, v]) => ({ ...acc, [k]:
                        v === Object(v) ? this.removeEmpty(v) : v
                    }),
                    {}
                );
        }
    }

    public transformer(row: String): String {
        let obj = JSON.parse(String(row));
        let ret = this.removeEmpty(obj);

        return serializeJsonObj(ret);
    }
}
