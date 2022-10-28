export function isPlainObj(o: object): boolean {
    return (o && !Array.isArray(o) && typeof o === 'object');
}

export function mergeObj<T extends object>(o1: T, o2: T): T {
    if (o1 == null || o2 == null) {
        return o1 || o2;
    }

    let res: T = ({} as T);
    let keys: Set<string> = new Set(Object.keys(o1).concat(Object.keys(o2)));

    for (const key of Array.from(keys.values())) {
        if (isPlainObj(o1[key])) {
            res[key] = mergeObj(o1[key], o2[key]);
        } else if (isPlainObj(o2[key])) {
            res[key] = mergeObj(o1[key], o2[key]);
        } else {
            res[key] = o1[key] || o2[key];
        }
    }
    return res;
}

export function mergeJson(o1: string, o2: string): string {
    let res = mergeObj(JSON.parse(o1), JSON.parse(o2));
    return JSON.stringify(res);
}

export function convertJsonWithKeys(jsonstr: string, keys: string[], include: boolean = true): string {
    let jobj = JSON.parse(jsonstr);
    let ret = convertObjWithKeys(jobj, keys, include);

    var allKeys = [];
    var seen = {};
    JSON.stringify(ret, function (key, value) {
        if (!(key in seen)) {
            allKeys.push(key);
            seen[key] = null;
        }
        return value;
    });
    allKeys.sort();

    return JSON.stringify(ret, allKeys);
}

export function convertObjWithKeys(o: object, keys: string[], include: boolean = true): object {
    let ekeys = Object.keys(o).filter(k => (keys.includes(k) == include) );
    let ret_all = ekeys.reduce((obj, k) => Object.assign(obj, { [k]: o[k] }), {});
    let ret = Object.fromEntries(Object.entries(ret_all).filter(([_, v]) => v != null));

    return ret;
}

export function serializeJsonObj(o: object) {
    var allKeys = [];
    var seen = {};
    JSON.stringify(o, function (key, value) {
        if (!(key in seen)) {
            allKeys.push(key);
            seen[key] = null;
        }
        return value;
    });
    allKeys.sort();

    return JSON.stringify(o, allKeys);
}

export function assert(expr: boolean) {
    if(!expr) {
        // Do something bad here
    }
}
