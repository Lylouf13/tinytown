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
    [RESOURCES.SCAVENGED]: 0,
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
  buildings: {
    [TOWN_BUILDINGS.FARM]: 0,
    [TOWN_BUILDINGS.MILL]: 0,
    [TOWN_BUILDINGS.MINE]: 0,
    [TOWN_BUILDINGS.FORGE]: 0,
    [TOWN_BUILDINGS.TOWER]: 0,
  },
};

export const townManagerSlice = createSlice({
  name: "townManager",
  initialState,
  reducers: {
    updateWeeklyIncome: (state) => {

      var weeklyIncome = {
        ...state.weeklyIncome,
        [RESOURCES.HUMANS]: 10 + (state.buildings[TOWN_BUILDINGS.FARM] * (state.buildings[TOWN_BUILDINGS.MILL] + 1)),
        [RESOURCES.GOLD]: 0 + state.buildings[TOWN_BUILDINGS.MINE],
        [RESOURCES.SCAVENGED]: 0,
        [RESOURCES.SOULS]: 0,
      }
      console.log(weeklyIncome);
      // console.log(state.buildings[TOWN_BUILDINGS.FARM])
      return {
        ...state,
        weeklyIncome
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
  updateWeeklyIncome,
  unlockUnitUpgrade,
  createBuilding,
  spendResources,
} = townManagerSlice.actions;

export default townManagerSlice.reducer;
