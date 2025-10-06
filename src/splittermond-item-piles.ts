declare const Hooks: any;
declare const game: any;

interface Currency {
    type: string;
    name: string;
    img: string;
    abbreviation: string;
    data: {
        path: string;
    }
    primary: boolean;
    exchangeRate: number;

}

export const release_13_config = {

    VERSION: "1.0",

    // The actor class type is the type of actor that will be used for the default item pile actor that is created on first item drop.
    ACTOR_CLASS_TYPE: "character",

    ITEM_CLASS_LOOT_TYPE: "",

    // The item class type is the type of item that will be used for the default weapon item
    ITEM_CLASS_WEAPON_TYPE: "weapon",

    // The item class type is the type of item that will be used for the default equipment item
    "ITEM_CLASS_EQUIPMENT_TYPE": "equipment",

    // The item quantity attribute is the path to the attribute on items that denote how many of that item that exists
    "ITEM_QUANTITY_ATTRIBUTE": "system.quantity",

    // Item filters actively remove items from the item pile inventory UI that users cannot loot, such as spells, feats, and classes
    "ITEM_FILTERS": [
        {
            path: "type",
            filters: ["strength", "weakness", "mastery", "species", "culture", "ancestry", "education", "resource", "npcfeature", "moonsign", "language", "culturelore", "statuseffect", "spelleffect", "npcattack", "spell"].join(",")
        }
    ],

    // Item similarities determines how item piles detect similarities and differences in the system
    "ITEM_SIMILARITIES": ["name", "type"],

    "UNSTACKABLE_ITEM_TYPES": [],

    // Currencies in item piles is a versatile system that can accept actor attributes (a number field on the actor's sheet) or items (actual items in their inventory)
    // In the case of attributes, the path is relative to the "actor.system"
    // In the case of items, it is recommended you export the item with `.toObject()` and strip out any module data
    "CURRENCIES": [
        {
            type: "attribute",
            name: "Solare",
            img: "icons/commodities/currency/coin-embossed-crown-gold.webp",
            abbreviation: "{#}S",
            data: {
                path: "system.currency.S"
            },
            primary: false,
            exchangeRate: 100
        },
        {
            type: "attribute",
            name: "Lunare",
            img: "icons/commodities/currency/coin-engraved-moon-silver.webp",
            abbreviation: "{#}L",
            data: {
                path: "system.currency.L"
            },
            primary: true,
            exchangeRate: 1
        },
        {
            "type": "attribute",
            "name": "Telare",
            "img": "icons/commodities/currency/coin-engraved-waves-copper.webp",
            "abbreviation": "{#}T",
            "data": {
                "path": "system.currency.T"
            },
            "primary": false,
            "exchangeRate": 0.01
        }
    ],

    // This function is an optional system handler that specifically transforms an item's price into a more unified numeric format
    ITEM_COST_TRANSFORMER: (item: any, currencies: Currency[]) => {

        const costString = item.system.price as string;
        console.debug("ItemPiles: Splittermond | Received cost string:", costString);
        let totalCost = 0;
        const cost = /^(?:(?<Solare>\d+)\s*[Ss])?\s*(?:(?<Lunare>\d+)\s*[Ll])?\s*(?:(?<Telare>\d+)\s*[Tt])?$/.exec(costString)?.groups;

        totalCost = totalCost + parseInt(cost?.Solare ?? "0") * (currencies.find(c => c.name === "Solare")?.exchangeRate ?? 0);
        totalCost = totalCost + parseInt(cost?.Lunare ?? "0") * (currencies.find(c => c.name === "Lunare")?.exchangeRate ?? 0);
        totalCost = totalCost + parseInt(cost?.Telare ?? "0") * (currencies.find(c => c.name === "Telare")?.exchangeRate ?? 0);
        console.debug(`ItemPiles: Splittermond | Calculated total price:${costString}L`);
        return totalCost;
    }
}

Hooks.once("item-piles-ready", async () => {
    const VERSIONS = {
        "13.2.2": release_13_config,
        "13.2.3": release_13_config,
        "13.2.4": release_13_config,
        "13.2.5": release_13_config,
        "13.3.0": release_13_config,
        "13.3.1": release_13_config,
        "13.4.0": release_13_config,
        "13.5.0": release_13_config,
        "13.5.1": release_13_config,
        "13.5.2": release_13_config,
        "13.6.0": release_13_config,
    }

    // Add configuration into item piles via the API
    for (const [version, data] of Object.entries(VERSIONS)) {
        await game.itempiles.API.addSystemIntegration(data, version);
    }
    console.log("ItemPiles: Splittermond | Initialized Item Piles integration for Splittermond");
});