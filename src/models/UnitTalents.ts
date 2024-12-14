import { UNIT_TYPES, unitDatabase } from "./Units";

export enum UNIT_TALENTS {
    RAGE_OF_THE_ANCIENTS = "Rage of the Ancients",
    RAGE_OF_THE_ANCIENTS_2 = "Rage of the Ancients 2",
    NOT_A_TEST_UPGRADE = "Not a test upgrade",
    CHOICE_NODE_ENJOYER_1 = "Choice Node Enjoyer 1",
    CHOICE_NODE_ENJOYER_2 = "Choice Node Enjoyer 2",
  }
  
  interface Talent {
    name: string;
    description: string;
    requirements: UNIT_TALENTS[];
    unlocked: boolean;
    effect: () => void;
  }
  
  export const unitTalentsDatabase: { [key in UNIT_TALENTS]: Talent } = {
    [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS]: {
      name: "Rage of the Ancients",
      description: "increases strength by 1",
      requirements: [],
      unlocked: false,
      effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1),
    },
  
    [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2]: {
      name: "Rage of the Ancients 2",
      description: "increases strength by 2",
      requirements: [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS],
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
      unlocked: false,
      effect: () => (unitDatabase[UNIT_TYPES.BERSERK].strength += 1000),
    },
  
    [UNIT_TALENTS.CHOICE_NODE_ENJOYER_1]: {
      name: "Choice Node Enjoyer 1",
      description: "increases strength by 1",
      requirements: [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,],
      unlocked: false,
      effect: () => (unitDatabase[UNIT_TYPES.BERSERK].defense += 1),
    },
  
    [UNIT_TALENTS.CHOICE_NODE_ENJOYER_2]: {
      name: "Choice Node Enjoyer 2",
      description: "increases strength by 2",
      requirements: [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,],
      unlocked: false,
      effect: () => (unitDatabase[UNIT_TYPES.BERSERK].defense += 150),
    },
  };