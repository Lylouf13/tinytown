import { createSlice } from "@reduxjs/toolkit";
import { UNIT_TALENTS,unitTalentsDatabase } from "models/UnitTalents";

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
  unlockedUnitTalents : UNIT_TALENTS[];
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
  unlockedUnitTalents: []
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
    unlockUnitUpgrade: (state, action: { payload: UNIT_TALENTS }) => {
      if (!state.unlockedUnitTalents.includes(action.payload)) {
        state.unlockedUnitTalents.push(action.payload);
        unitTalentsDatabase[action.payload].unlocked = true;
        unitTalentsDatabase[action.payload].effect();
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
