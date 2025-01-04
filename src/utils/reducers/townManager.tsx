import { createSlice } from "@reduxjs/toolkit";
import { unitTalentsDatabase } from "models/UnitTalents";
import { UNIT_TALENTS } from "enums/UnitTalents";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { RESOURCES } from "enums/Resources";

interface TownState {
  resources: {
    [keys in RESOURCES]: number;
  };
  previousFightResources: {
    [key: string]: number;
  };

  weeklyIncome: {
    [keys in RESOURCES]: number;
  };
  unlockedUnitTalents: UNIT_TALENTS[];
  buildings: {
    [key: string]: number;
  };
}

const initialState: TownState = {
  resources: {
    [RESOURCES.HUMANS]: 10,
    [RESOURCES.GOLD]: 0,
    [RESOURCES.SCAVENGED]: 1000,
    [RESOURCES.SOULS]: 0,
  },
  previousFightResources: {},

  weeklyIncome: {
    [RESOURCES.HUMANS]: 10,
    [RESOURCES.GOLD]: 0,
    [RESOURCES.SCAVENGED]: 0,
    [RESOURCES.SOULS]: 0,
  },
  unlockedUnitTalents: [],
  buildings: {},
};

export const townManagerSlice = createSlice({
  name: "townManager",
  initialState,
  reducers: {
    updateWeeklyIncome: (state, action) => {
      var resources = { ...state.weeklyIncome };

      Object.keys(action.payload).forEach((key) => {
        resources[key as keyof typeof resources] =
          resources[key as keyof typeof resources] + action.payload[key];
      })
      return {
        ...state,
        weeklyIncome: action.payload,
      };
      
    },
    generateResources: (state, action) => {
      var resources = { ...state.resources };
      var previousFightResources: { [key: string]: number } = {};

      Object.keys(action.payload).forEach((key) => {
        previousFightResources[key] = action.payload[key];
        resources[key as keyof typeof resources] =
          resources[key as keyof typeof resources] + action.payload[key];
      });

      return {
        ...state,
        resources,
        previousFightResources,
      };
    },
    spendResources: (state, action) => {
      var resources = { ...state.resources };
      Object.keys(action.payload).forEach((key) => {
        resources[key as keyof typeof resources] =
          resources[key as keyof typeof resources] - action.payload[key];
      });
      return {
        ...state,
        resources,
      };
    },
    unlockUnitUpgrade: (state, action: { payload: UNIT_TALENTS }) => {
      if (!state.unlockedUnitTalents.includes(action.payload)) {
        state.unlockedUnitTalents.push(action.payload);
        unitTalentsDatabase[action.payload].unlocked = true;
        unitTalentsDatabase[action.payload].effect();
      }
    },
    createBuilding: (state, action: { payload: TOWN_BUILDINGS }) => {
      if (!state.buildings[action.payload]) {
        state.buildings[action.payload] = 1;
      } else ++state.buildings[action.payload];
    },
  },
});

export const {
  generateResources,
  unlockUnitUpgrade,
  createBuilding,
  spendResources,
} = townManagerSlice.actions;

export default townManagerSlice.reducer;
