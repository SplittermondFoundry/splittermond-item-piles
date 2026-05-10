import {describe, it} from "mocha";
import {expect} from "chai";
import {release_13_config} from "./splittermond-item-piles";
import sinon from "sinon";
import semver from "semver";

describe("Item Piles conversion", () => {
    [
        ["1S", 100],
        ["15T", 0.15],
        ["2S 3 T", 200.03],
        ["  1 L  2 T", 1.02]
    ].forEach(([input, expectation]) => {
        it(`should convert ${input} to ${expectation}`, () => {
            const transformedCost = release_13_config.ITEM_COST_TRANSFORMER({system: {price: input}}, release_13_config.CURRENCIES);
            expect(transformedCost).to.equal(expectation);
        });
    });
});

describe("Version generation", () => {
    it("should generate correct version list", async () => {
        const systemIntegrationMock = sinon.stub().resolves();
        global.game = {
            itempiles: {
                API: {
                    addSystemIntegration: systemIntegrationMock
                }
            }
        }

        await Promise.all(Array.from(global.Hooks.map.values()).flatMap((a: Function[]) => a).map(async (func) => await func()));
        const versions = systemIntegrationMock.args.flatMap(([__, version]) => version as string);

        expect(versions).to.not.be.empty;
        expect(versions.every(version => semver.valid(version))).to.equal(true);
        expect(new Set(versions).size).to.equal(versions.length);

        const semverSorted = [...versions].sort(semver.compare);
        expect(versions).to.deep.equal(semverSorted);

        expect(versions[0]).to.equal("13.5.0");
        expect(versions[versions.length - 1]).to.equal("14.15.0");

        const v13Versions = versions.filter(version => semver.satisfies(version, ">=13.5.0 <=13.15.0"));
        const v14Versions = versions.filter(version => semver.satisfies(version, ">=14.0.0 <=14.15.0"));

        expect(v13Versions).to.include("13.15.0");
        expect(v14Versions).to.include("14.15.0");
        expect(versions).to.not.include("13.15.1");
        expect(versions).to.not.include("14.15.1");
        expect(versions.length).to.equal(v13Versions.length + v14Versions.length);
    });

});
