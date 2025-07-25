import {describe, it} from "mocha";
import {expect} from "chai";
import {release_13_config} from "./splittermond-item-piles";

describe("Item Piles conversion", () => {
    [
        ["1S",100],
        ["15T",0.15],
        ["2S 3 T",200.03],
        ["  1 L  2 T",1.02]
    ].forEach(([input,expectation]) => {
        it(`should convert ${input} to ${expectation}`, () => {
           const transformedCost = release_13_config.ITEM_COST_TRANSFORMER({system: {price: input}}, release_13_config.CURRENCIES);
           expect(transformedCost).to.equal(expectation);
        });
    });
});