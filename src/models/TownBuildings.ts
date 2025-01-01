import { RESOURCES } from "../enums/Resources";
import { TOWN_BUILDINGS } from "enums/TownBuildings";

interface building {
  name: string;
  description: string;
  requirements: TOWN_BUILDINGS[];
  cost: { [key in RESOURCES]: number };
  count: number;
  maxCount: number;
  unlocked: boolean;
  effect: () => void;
}

export const townBuildingDatabase: { [key in TOWN_BUILDINGS]: building } = {
  [TOWN_BUILDINGS.FARM]: {
    name: "Farm",
    description: "increases food by 1",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 100000000000,
    unlocked: false,
    effect: () => {},
  },

  [TOWN_BUILDINGS.FORGE]: {
    name: "Forge",
    description: "Unlocks Talents System",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 1,
    unlocked: false,
    effect: () => {},
  },

  [TOWN_BUILDINGS.MILL]: {
    name: "Mill",
    description: "Buffs farms",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 1,
    unlocked: false,
    effect: () => {},
  },

  [TOWN_BUILDINGS.MINE]: {
    name: "Mine",
    description: "Gives regular gold income",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 1,
    unlocked: false,
    effect: () => {},
  },

  [TOWN_BUILDINGS.TOWER]: {
    name: "Tower",
    description: "Adds permanent defense",
    requirements: [],
    cost: {
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0, 
    },
    count: 0,
    maxCount: 25,
    unlocked: false,
    effect: () => {},
  },
};
