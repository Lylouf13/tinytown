import { UNIT_TYPES, unitDatabase } from "./Units";
import { RESOURCES } from "./Enums";

export enum UNIT_TALENTS {
  // Berserk
  RAGE_OF_THE_ANCIENTS = "Rage of the Ancients",
  RAGE_OF_THE_ANCIENTS_2 = "Rage of the Ancients 2",
  NOT_A_TEST_UPGRADE = "Not a test upgrade",
}

interface Talent {
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
};
