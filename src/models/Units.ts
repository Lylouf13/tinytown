import { Unit } from "./Types.ts";

export class Berserk extends Unit {
  constructor() {
    super({
      name: "Berserk",
      strength: 1,
      defense: 1,
      cost: 1,
      ranged: false,
      passives: ["pillager"],
      description: `A cheap unit that uses anything he can find as a weapon to protect the town.
            Can find resources to salvage during fights`,
      upgrades: [
        "Rage of the Ancients",
        "Rage of the Ancients 2",
        "Not a test upgrade",
      ],
    });
  }
}

export class Bower extends Unit {
  constructor() {
    super({
      name: "Bower",
      strength: 2,
      defense: 1,
      cost: 2,
      ranged: true,
      passives: ["salva"],
      description: `A potent but fragile unit, uses a bow to pick down enemies before they can attack.
            Works well with a frontlane protecting them`,
      upgrades: [],
    });
  }
}

export class Guardian extends Unit {
  constructor() {
    super({
      name: "Guardian",
      strength: 1,
      defense: 5,
      cost: 3,
      ranged: true,
      passives: ["protector", "pillager"],
      description: `A strong and expensive unit, protects the others from the ennemies assault, adding
            durability to your army`,
      upgrades: [],
    });
  }
}

// Define unit types as string constants
export enum UNIT_TYPES {
  BERSERK = "berserk",
  BOWER = "bower",
  GUARDIAN = "guardian",
}

export const unitDatabase: { [key: string]: Unit } = {
  [UNIT_TYPES.BERSERK]: new Berserk(),

  [UNIT_TYPES.BOWER]: new Bower(),

  [UNIT_TYPES.GUARDIAN]: new Guardian(),
};

export enum UNIT_PASSIVES {
  PILLAGER = "pillager",
  SALVA = "salva",
  PROTECTOR = "protector",
  DIVINER = "diviner",
}

export enum UNIT_UPGRADES {
  RAGE_OF_THE_ANCIENTS = "Rage of the Ancients",
  RAGE_OF_THE_ANCIENTS_2 = "Rage of the Ancients 2",
  NOT_A_TEST_UPGRADE = "Not a test upgrade",
}

interface Upgrade {
  name: string;
  description: string;
  requirements: UNIT_UPGRADES[];
  unlocked: boolean;
  effect: () => void;
}

export const unitUpgradesDatabase: { [key in UNIT_UPGRADES]: Upgrade } = {
  [UNIT_UPGRADES.RAGE_OF_THE_ANCIENTS]: {
    name: "Rage of the Ancients",
    description: "increases strength by 1",
    requirements: [],
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
  },

  [UNIT_UPGRADES.RAGE_OF_THE_ANCIENTS_2]: {
    name: "Rage of the Ancients 2",
    description: "increases strength by 2",
    requirements: [UNIT_UPGRADES.RAGE_OF_THE_ANCIENTS],
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 2),
  },

  [UNIT_UPGRADES.NOT_A_TEST_UPGRADE]: {
    name: "Not a test upgrade",
    description: "increases strength by 1000",
    requirements: [
      UNIT_UPGRADES.RAGE_OF_THE_ANCIENTS,
      UNIT_UPGRADES.RAGE_OF_THE_ANCIENTS_2,
    ],
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1000),
  },
};
