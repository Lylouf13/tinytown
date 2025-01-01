import { UNIT_TYPES } from "enums/UnitTypes";
import { RESOURCES } from "../enums/Resources";
import { UNIT_TALENTS } from "../enums/UnitTalents";
import { UNIT_PASSIVES } from "enums/UnitPassives";
import { unitDatabase } from "./Units";

export interface Talent {
  name: string;
  description: string;
  requirements: UNIT_TALENTS[];
  cost: { [key in RESOURCES]: number };
  unlocked: boolean;
  effect: () => void;
}

export const unitTalentsDatabase: { [key in UNIT_TALENTS]: Talent } = {
  [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS]: {
    name: "Rage of the Ancients",
    description: "increases strength by 1",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
  },

  [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2]: {
    name: "Rage of the Ancients 2",
    description: "increases strength by 2",
    requirements: [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS],
    cost: {
      [RESOURCES.GOLD]: 10,
      [RESOURCES.SCAVENGED]: 0,
      [RESOURCES.SOULS]: 20,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 2),
  },

  [UNIT_TALENTS.NOT_A_TEST_UPGRADE]: {
    name: "Not a test upgrade",
    description: "increases strength by 1000",
    requirements: [
      UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,
      UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
    ],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 0,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1000),
  },

  [UNIT_TALENTS.KING_OF_THE_HILL]: {
    name: "King Of The Hill",
    description: "Each pack of 3 berserk scavenges 1 more resource",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BERSERK].addPassive(UNIT_PASSIVES.SALVA)),
  },
  [UNIT_TALENTS.BOWER_1]: {
    name: "Bower 1",
    description: "1 more strength !!!",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_TALENTS.BOWER_2]: {
    name: "Bower 2",
    description: "1 more strength !!!",
    requirements: [UNIT_TALENTS.BOWER_1],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_TALENTS.BOWER_3]: {
    name: "Bower 3",
    description: "1 more strength !!!",
    requirements: [UNIT_TALENTS.BOWER_1],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_TALENTS.BOWER_4]: {
    name: "Bower 4",
    description: "1 more strength !!!",
    requirements: [UNIT_TALENTS.BOWER_2, UNIT_TALENTS.BOWER_3],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_TALENTS.BOWER_5]: {
    name: "Bower 5",
    description: "1 more strength !!!",
    requirements: [UNIT_TALENTS.BOWER_4],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.BOWER].strength += 1),
  },
  [UNIT_TALENTS.GUARDIAN_1]:{
    name: "Guardian 1",
    description: "1 more DEF !!!",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_TALENTS.GUARDIAN_2]:{
    name: "Guardian 2",
    description: "1 more DEF !!!",
    requirements: [UNIT_TALENTS.GUARDIAN_1],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_TALENTS.GUARDIAN_3]:{
    name: "Guardian 3",
    description: "1 more DEF !!!",
    requirements: [UNIT_TALENTS.GUARDIAN_2],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_TALENTS.GUARDIAN_4]:{
    name: "Guardian 4",
    description: "1 more DEF !!!",
    requirements: [UNIT_TALENTS.GUARDIAN_2],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
  [UNIT_TALENTS.GUARDIAN_5]:{
    name: "Guardian 5",
    description: "1 more DEF !!!",
    requirements: [UNIT_TALENTS.GUARDIAN_3,UNIT_TALENTS.GUARDIAN_4],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    unlocked: false,
    effect: () => (unitDatabase[UNIT_TYPES.GUARDIAN].defense += 1),
  },
};
