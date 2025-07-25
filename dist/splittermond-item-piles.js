Hooks.once("item-piles-ready", async () => {
  const s = {
    "13.2.2": {
      VERSION: "1.0",
      // The actor class type is the type of actor that will be used for the default item pile actor that is created on first item drop.
      ACTOR_CLASS_TYPE: "character",
      ITEM_CLASS_LOOT_TYPE: "",
      // The item class type is the type of item that will be used for the default weapon item
      ITEM_CLASS_WEAPON_TYPE: "weapon",
      // The item class type is the type of item that will be used for the default equipment item
      ITEM_CLASS_EQUIPMENT_TYPE: "equipment",
      // The item quantity attribute is the path to the attribute on items that denote how many of that item that exists
      ITEM_QUANTITY_ATTRIBUTE: "system.quantity",
      // Item filters actively remove items from the item pile inventory UI that users cannot loot, such as spells, feats, and classes
      ITEM_FILTERS: [
        {
          path: "type",
          filters: ["strength", "weakness", "mastery", "species", "culture", "ancestry", "education", "resource", "npcfeature", "moonsign", "language", "culturelore", "statuseffect", "spelleffect", "npcattack", "spell"].join(",")
        }
      ],
      // Item similarities determines how item piles detect similarities and differences in the system
      ITEM_SIMILARITIES: ["name", "type"],
      UNSTACKABLE_ITEM_TYPES: [],
      // Currencies in item piles is a versatile system that can accept actor attributes (a number field on the actor's sheet) or items (actual items in their inventory)
      // In the case of attributes, the path is relative to the "actor.system"
      // In the case of items, it is recommended you export the item with `.toObject()` and strip out any module data
      CURRENCIES: [
        {
          type: "attribute",
          name: "Solare",
          img: "icons/commodities/currency/coin-embossed-crown-gold.webp",
          abbreviation: "{#}S",
          data: {
            path: "system.currency.S"
          },
          primary: !1,
          exchangeRate: 100
        },
        {
          type: "attribute",
          name: "Lunare",
          img: "icons/commodities/currency/coin-engraved-moon-silver.webp",
          abbreviation: "{#}SP",
          data: {
            path: "system.currency.L"
          },
          primary: !0,
          exchangeRate: 1
        },
        {
          type: "attribute",
          name: "Telare",
          img: "icons/commodities/currency/coin-engraved-waves-copper.webp",
          abbreviation: "{#}T",
          data: {
            path: "system.currency.T"
          },
          primary: !1,
          exchangeRate: 0.01
        }
      ],
      // This function is an optional system handler that specifically transforms an item's price into a more unified numeric format
      ITEM_COST_TRANSFORMER: (n, a) => {
        const c = n.system.price;
        let e = 0;
        const r = /^(?:(?<Solare>\d+)[Ss])?\s*(?:(?<Lunare>\d+)[Ll])?\s*(?:(?<Telare>\d+)[Tt])?$/.exec(c)?.groups;
        return e = e + parseInt(r?.Solare ?? "0") * (a.find((t) => t.name === "Solare")?.exchangeRate ?? 0), e = e + parseInt(r?.Lunare ?? "0") * (a.find((t) => t.name === "Lunare")?.exchangeRate ?? 0), e = e + parseInt(r?.Telare ?? "0") * (a.find((t) => t.name === "Telare")?.exchangeRate ?? 0), e;
      }
    }
  };
  for (const [n, a] of Object.entries(s))
    await game.itempiles.API.addSystemIntegration(a, n);
});
//# sourceMappingURL=splittermond-item-piles.js.map
