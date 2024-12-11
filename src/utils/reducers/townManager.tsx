import { createSlice } from "@reduxjs/toolkit";
import { UNIT_UPGRADES,unitUpgradesDatabase } from "models/Units";

enum RESOURCES {
  GOLD = "gold",
  SCAVENGED = "scavenged",
  SOULS = "souls",
}

type TownState = {
  resources: {
    [key: string]: number;
  };
  previousFightResources: {
    [key: string]: number;
  };

  humans: number;
  humansPerWeek: number;
  unlockedUnitUpgrades : UNIT_UPGRADES[];
};

const initialState: TownState = {
  resources: {
    [RESOURCES.GOLD]: 0,
    [RESOURCES.SCAVENGED]: 0,
    [RESOURCES.SOULS]: 0,
  },
  previousFightResources: {},

  humans: 10,
  humansPerWeek: 10,
  unlockedUnitUpgrades: []
};

export const townManagerSlice = createSlice({
  name: "townManager",
  initialState,
  reducers: {
    generateWeeklyHumans: (state) => {
      var humans = state.humans + state.humansPerWeek;

      return {
        ...state,
        humans,
      };
    },
    removeHumans: (state, action) => {
      var humans = state.humans - action.payload;
      return {
        ...state,
        humans,
      };
    },
    generateResources: (state, action) => {
      var resources: { [key: string]: number } = { ...state.resources };
      var previousFightResources: { [key: string]: number } = {};

      Object.keys(action.payload).forEach((key) => {
        previousFightResources[key] = action.payload[key];
        resources[key] = resources[key] + action.payload[key];
      });

      return {
        ...state,
        resources,
        previousFightResources,
      };
    },
    unlockUnitUpgrade: (state, action: { payload: UNIT_UPGRADES }) => {
      if (!state.unlockedUnitUpgrades.includes(action.payload)) {
        state.unlockedUnitUpgrades.push(action.payload);
        unitUpgradesDatabase[action.payload].unlocked = true;
        unitUpgradesDatabase[action.payload].effect();
      }
    }
  },
});

export const {
  generateWeeklyHumans,
  removeHumans,
  generateResources,
  unlockUnitUpgrade,
} = townManagerSlice.actions;

export default townManagerSlice.reducer;
