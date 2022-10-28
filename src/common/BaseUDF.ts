import { plainToClass } from 'class-transformer';

export abstract class BaseUDF<I extends object, O extends object> {
	abstract transformer(row: I): O

    transform(row: object): object {
        let input: I = (row as I);
        let output: O = this.transformer(input);

        return output;
    }
}

export abstract class BaseUDAF<I extends object, O extends object> {
	abstract transformer(rows: Array<I>): O

    transform(rows: Array<object>): object {
        let inputs: Array<I> = rows.map(r => (r as I));
        let output: O = this.transformer(inputs);

        return output;
    }
}

export abstract class BaseUDTF<I extends object, O extends object> {
    abstract transformer(rows: Array<I>): Array<O>

    protected constructor() {};

    transform(rows: Array<object>): Array<object> {
        let inputs: Array<I> = rows.map(r => (r as I));
        let outputs: Array<O> = this.transformer(inputs);

        return outputs;
    }
}

export abstract class BaseUDTFWithKey<I extends object, O extends object> {
    abstract transformer(k: string, rows: Array<I>): Array<O>

    protected constructor() {};

    transform(k: string, rows: Array<object>): Array<object> {
        let inputs: Array<I> = rows.map(r => (r as I));
        let outputs: Array<O> = this.transformer(k, inputs);

        return outputs;
    }
}
