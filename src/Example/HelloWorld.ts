import { BaseUDF } from '../common/BaseUDF';

type InputType = {
    word: string,
    n: number,
    ts: Date
}

type OutputType = {
    res: string,
    n: number
}

export class HelloWorldUDF extends BaseUDF<InputType, OutputType> {
    private static instance: HelloWorldUDF;
    public static getInstance(): HelloWorldUDF {
        if (!HelloWorldUDF.instance) {
            HelloWorldUDF.instance = new HelloWorldUDF();
        }
        return HelloWorldUDF.instance;
    }

    private header: string = null;
    private constructor() {
        super();
        this.header = "[HelloWorldUDF]";
    }

    public transformer(row: InputType): OutputType {
        return {
            res: `${row.word}-${row.n}-${row.ts.getTime()}`,
            n: row.n * 10
        }
    }
}
