import { RESOURCES } from "../enums/Resources";
import { TOWN_BUILDINGS } from "enums/TownBuildings";

export interface Building {
  name: string;
  description: string;
  cost: { [key in RESOURCES]: number };
  count: number;
  maxCount: number;
}

export const townBuildingDatabase: { [key in TOWN_BUILDINGS]: Building } = {
  [TOWN_BUILDINGS.FARM]: {
    name: "Farm",
    description: "Generates an additionnal human per week",
    cost: {
      [RESOURCES.HUMANS]: 2,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 10,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 100000000000,
  },

  [TOWN_BUILDINGS.FORGE]: {
    name: "Forge",
    description: "Unlocks Talents System",
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 500,
      [RESOURCES.SCAVENGED]: 150,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 1,
  },

  [TOWN_BUILDINGS.MILL]: {
    name: "Mill",
    description: "Buffs farms",
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 300,
      [RESOURCES.SCAVENGED]: 300,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 1,
  },

  [TOWN_BUILDINGS.MINE]: {
    name: "Mine",
    description: "Gives regular gold income",
    cost: {
      [RESOURCES.HUMANS]: 1,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 10,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 100000000,
  },

  [TOWN_BUILDINGS.TOWER]: {
    name: "Tower",
    description: "Adds permanent defense",
    cost: {
      [RESOURCES.HUMANS]: 0,
      [RESOURCES.GOLD]: 0,
      [RESOURCES.SCAVENGED]: 30,
      [RESOURCES.SOULS]: 0,
    },
    count: 0,
    maxCount: 25,
  },
};
