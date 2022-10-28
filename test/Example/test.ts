import { expect } from "chai";
import { HelloWorldUDF } from "../../src/Example/HelloWorld";

describe("HelloWorldUDF", () => {
    const f = HelloWorldUDF.getInstance();

    it("Hello", () => {
        const tin = { word: "hello", n: "10", ts: new Date("2021-08-14 20:37:41Z") };
        const tout = { n: 100, res: "hello-10-1628973461000" };

        expect(f.transform(tin)).to.eql(tout);
    })
})
