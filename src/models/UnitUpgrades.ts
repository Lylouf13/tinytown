import { UNIT_TYPES } from "enums/UnitTypes";
import { RESOURCES } from "../enums/Resources";
import { UNIT_UPGRADES } from "../enums/UnitUpgrades";
import { UNIT_PASSIVES } from "enums/UnitPassives";
import { unitDatabase } from "./Units";

export interface Talent {
  name: string;
  description: string;
  requirements: UNIT_UPGRADES[];
  cost: { [key in RESOURCES]: number };
  unlocked: boolean;
  effect: () => void;
}

export const unitUpgradesDatabase: { [key in UNIT_UPGRADES]: Talent } = {
  [UNIT_UPGRADES.BERSERK_1]: {
    name: "Rage of the Ancients",
    description: "increases strength by 1",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 20,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
  },

  [UNIT_UPGRADES.BERSERK_2]: {
    name: "Rage of the Ancients 2",
    description: "increases strength by 2",
    requirements: [UNIT_UPGRADES.BERSERK_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 2),
  },

  [UNIT_UPGRADES.BERSERK_3]: {
    name: "Not a test upgrade",
    description: "increases strength by 1000",
    requirements: [UNIT_UPGRADES.BERSERK_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1000),
  },

  [UNIT_UPGRADES.BERSERK_4]: {
    name: "King Of The Hill",
    description: "Each pack of 3 berserk scavenges 1 more resource",
    requirements: [UNIT_UPGRADES.BERSERK_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BERSERK].addPassive(UNIT_PASSIVES.SALVA),
  },
  [UNIT_UPGRADES.BERSERK_5]: {
    name: "King Of The Hill",
    description: "Each pack of 3 berserk scavenges 1 more resource",
    requirements: [UNIT_UPGRADES.BERSERK_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BERSERK].addPassive(UNIT_PASSIVES.SALVA),
  },
  [UNIT_UPGRADES.BOWER_1]: {
    name: "Bower 1",
    description: "1 more strength !!!",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.BOWER_2]: {
    name: "Bower 2",
    description: "1 more strength !!!",
    requirements: [UNIT_UPGRADES.BOWER_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BOWER].addPassive(UNIT_PASSIVES.SALVA),
  },
  [UNIT_UPGRADES.BOWER_3]: {
    name: "Bower 3",
    description: "1 more strength !!!",
    requirements: [UNIT_UPGRADES.BOWER_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.BOWER_4]: {
    name: "Bower 4",
    description: "1 more strength !!!",
    requirements: [UNIT_UPGRADES.BOWER_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.BOWER_5]: {
    name: "Bower 5",
    description: "1 more strength !!!",
    requirements: [UNIT_UPGRADES.BOWER_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_1]: {
    name: "Guardian 1",
    description: "1 more DEF !!!",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_2]: {
    name: "Guardian 2",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_3]: {
    name: "Guardian 3",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_4]: {
    name: "Guardian 4",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_5]: {
    name: "Guardian 5",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
};
