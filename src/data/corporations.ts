import type { CardsMap } from '@/types/card'

export const corporations: CardsMap = {
  CrediCor: {
    cardNum: "Z01",
    type: "corp",
    tags: [],
    resources: { mc: 57 },
    prod: {},
    color: "blue",
    cardExtra:
      "Effect:\n-20: 4\n(Effect: After you pay for a card or standard project with a basic cost of 20 mc or more, you gain 4 mc.)",
  },
  EcoLine: {
    cardNum: "Z02",
    type: "corp",
    tags: ["plant"],
    resources: { mc: 36, plant: 3 },
    prod: { plant: 2 },
    color: "blue",
    cardExtra:
      "Effect:\n7 plant -> Greenery Tile\n(Effect: You may always pay 7 plants, instead of 8, to place 1 greenery.)",
  },
  Helion: {
    cardNum: "Z03",
    type: "corp",
    tags: ["space"],
    resources: { mc: 42 },
    prod: { heat: 3 },
    color: "blue",
    cardExtra:
      "Effect:\nX heat = X mc\n(Effect: You may use heat as mc. You may not use mc as heat.)",
  },
  MiningGuild: {
    cardNum: "Z04",
    type: "corp",
    tags: ["building", "building"],
    resources: { mc: 30, steel: 5 },
    prod: { steel: 1 },
    color: "blue",
    cardExtra:
      "Effect:\nsteel/ti: (Effect: Each time you get any steel or ti as a placement bonus on the map, increase your steel production 1 step.)",
  },
  InterplanetaryCinematics: {
    cardNum: "Z05",
    type: "corp",
    tags: ["building"],
    resources: { mc: 30, steel: 20 },
    prod: {},
    color: "blue",
    cardExtra:
      "Effect:\nEvent: 2 mc\n(Effect: Each time you play an event, you gain 2 mc.)",
  },
  Inventrix: {
    cardNum: "Z06",
    type: "corp",
    tags: ["science"],
    resources: { mc: 45, card: 3 },
    prod: {},
    color: "blue",
    cardExtra:
      "Effect:\nRequirements: O2/Ocean/Temp: +/- 2\n(Effect: Your temperature, oxygen, and ocean requirements are +2 or -2 steps, your choice in each case.)",
  },
  PhoboLog: {
    cardNum: "Z07",
    type: "corp",
    tags: ["space"],
    resources: { mc: 23, ti: 10 },
    prod: {},
    color: "blue",
    cardExtra:
      'Effect:\nti: +1 mc\n(Effect: Your ti resources are each worth 1 mc extra.)\n--- Ed. note: It is not "Phoblog."',
  },
  TharsisRepublic: {
    cardNum: "Z08",
    type: "corp",
    tags: ["building"],
    resources: { mc: 40, city: 1 },
    prod: {},
    color: "blue",
    cardExtra:
      'Effect:\nany-City*: mc:1\nCity: 3 mc\n(Effect: Whenever any city tile is placed ON MARS, increase your mc production 1 step. When you place a city tile, gain 3 mc.)\n-- Ed. note: Some printings don\'t have the word "corporation" at the top of this card. This is a misprint.',
  },
  Thorgate: {
    cardNum: "Z09",
    type: "corp",
    tags: ["power"],
    resources: { mc: 48 },
    prod: { energy: 1 },
    color: "blue",
    discount: { power: 3 },
    cardExtra:
      "Effect:\n(Effect: When playing a power card OR THE STANDARD PROJECT POWER plant, you pay 6 it.",
  },
  UnitedNationsMarsInitiative: {
    cardNum: "Z10",
    type: "corp",
    tags: ["earth"],
    resources: { mc: 40 },
    prod: {},
    color: "blue",
    cardExtra:
      "Action:\n3 mc -> TR*\n(Action: If your Terraform Rating was raised this generations, you may pay 3 mc to raise it 1 step more.)",
  },
  Teractor: {
    cardNum: "Z11",
    type: "corp",
    tags: ["earth"],
    resources: { mc: 60 },
    prod: {},
    color: "blue",
    discount: { earth: 3 },
    cardExtra: "",
  },
  SaturnSystems: {
    cardNum: "Z12",
    type: "corp",
    tags: ["jovian"],
    resources: { mc: 42 },
    prod: { ti: 1 },
    color: "blue",
    cardExtra:
      "Effect:\nany-Jovian: mc:1\n(Effect: Each time any Jovian tag is put into play, including this, increase your mc production 1 step.)",
  },
  CheungShingMARS: {
    cardNum: "Z18",
    type: "corp",
    tags: ["building"],
    resources: { mc: 44 },
    prod: { mc: 3 },
    color: "blue",
    discount: { building: 2 },
    cardExtra: "",
  },
  PointLuna: {
    cardNum: "Z19",
    type: "corp",
    tags: ["earth", "space"],
    resources: { mc: 38 },
    prod: { ti: 1 },
    color: "blue",
    cardExtra:
      "Effect:\nEarth: +Card\n(Effect: When you play an Earth tag, including this, draw a card.)",
  },
  RobinsonIndustries: {
    cardNum: "Z20",
    type: "corp",
    tags: [],
    resources: { mc: 47 },
    prod: {},
    color: "blue",
    cardExtra:
      "Action:\n4 mc -> Increase ? 1*\n(Action: Spend 4 mc to increase (one of) your LOWEST PRODUCTION 1 step.)",
  },
  ValleyTrust: {
    cardNum: "Z21",
    type: "corp",
    tags: ["earth"],
    resources: { mc: 37, prelude: 1 },
    prod: {},
    color: "blue",
    discount: { science: 2 },
    cardExtra:
      "As your first action, draw 3 Prelude cards, and play one of them. Discard the other two.)\n",
  },
  Vitor: {
    cardNum: "Z22",
    type: "corp",
    tags: ["earth"],
    resources: { mc: 45, award: 1 },
    prod: {},
    color: "blue",
    cardExtra:
      "Effect:\nVP: ?*: 3 mc\n(Effect: When you play a card with a NON-NEGATIVE VP icon, including this, gain 3 mc.)",
  },
}
