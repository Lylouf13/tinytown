import { UNIT_TYPES } from "enums/UnitTypes";
import { RESOURCES } from "../enums/Resources";
import { UNIT_UPGRADES } from "../enums/UnitUpgrades";
import { UNIT_PASSIVES } from "enums/UnitPassives";
import { unitDatabase } from "./Units";

export interface Upgrade {
  name: string;
  description: string;
  requirements: UNIT_UPGRADES[];
  cost: { [key in RESOURCES]: number };
  unlocked: boolean;
  effect: () => void;
}


export const unitUpgradesDatabase: { [key in UNIT_UPGRADES]: Upgrade } = {
  [UNIT_UPGRADES.BERSERK_1]: {
    name: "Iron weapons",
    description: "increases strength by 1",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 20,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
  },

  [UNIT_UPGRADES.BERSERK_2]: {
    name: "For the ancients",
    description: "Melee pack keeps fallen berserks' strength for this fight",
    requirements: [UNIT_UPGRADES.BERSERK_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 50,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BERSERK].addPassive(UNIT_PASSIVES.VENGEFUL),
  },

  [UNIT_UPGRADES.BERSERK_3]: {
    name: "Boiled leather",
    description: "+1 Def",
    requirements: [UNIT_UPGRADES.BERSERK_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 100,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].defense += 1),
  },

  [UNIT_UPGRADES.BERSERK_4]: {
    name: "Improved dual wield",
    description: "+1 Strength",
    requirements: [UNIT_UPGRADES.BERSERK_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 150,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
  },
  [UNIT_UPGRADES.BERSERK_5]: {
    name: "Vicious Fighters",
    description: "Berserks dont take damage on their second attack of a turn.",
    requirements: [UNIT_UPGRADES.BERSERK_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 200,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BERSERK].addPassive(UNIT_PASSIVES.VICIOUS),
  },

  [UNIT_UPGRADES.BOWER_1]: {
    name: "Tempered arrowheads",
    description: "+1 strength",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 20,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.BOWER_2]: {
    name: "Salva",
    description: "Unlocks Salva, bowers now perform a free attack before the fight starts",
    requirements: [UNIT_UPGRADES.BOWER_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 50,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => unitDatabase[UNIT_TYPES.BOWER].addPassive(UNIT_PASSIVES.SALVA),
  },
  [UNIT_UPGRADES.BOWER_3]: {
    name: "Close quarters",
    description: "+1 def",
    requirements: [UNIT_UPGRADES.BOWER_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 100,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].defense += 1),
  },
  [UNIT_UPGRADES.BOWER_4]: {
    name: "Recurved bows",
    description: "+1 Strength",
    requirements: [UNIT_UPGRADES.BOWER_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 150,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_UPGRADES.BOWER_5]: {
    name: "Elaborate Planning",
    description: "1 free hit after melee is dead",
    requirements: [UNIT_UPGRADES.BOWER_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 200,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },

  [UNIT_UPGRADES.GUARDIAN_1]: {
    name: "Tempered Shields",
    description: "+1 Def",
    requirements: [],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 20,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_2]: {
    name: "Scavengers",
    description: "Are now able to generate Scavenged goods",
    requirements: [UNIT_UPGRADES.GUARDIAN_1],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 50,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_3]: {
    name: "Wrecking Crew",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_2],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 100,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_4]: {
    name: "TBD G4",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_3],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 150,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_UPGRADES.GUARDIAN_5]: {
    name: "Frontline Veteran",
    description: "1 more DEF !!!",
    requirements: [UNIT_UPGRADES.GUARDIAN_4],
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 200,
      [RESOURCES.SCAVENGED]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
};
