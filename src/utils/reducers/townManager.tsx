import { createSlice } from "@reduxjs/toolkit";
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
  buildings: {
    [key: string]: number;
  };
  freeForgeToken: boolean;
  isGlitterfield: boolean;
}

const initialState: TownState = {
  resources: {
    [RESOURCES.HUMANS]: 10,
    [RESOURCES.GOLD]: 10,
    [RESOURCES.SCAVENGED]: 10,
  },
  previousFightResources: {},
  weeklyIncome: {
    [RESOURCES.HUMANS]: 10,
    [RESOURCES.GOLD]: 0,
    [RESOURCES.SCAVENGED]: 0,
  },
  buildings: {
    [TOWN_BUILDINGS.FARM]: 0,
    [TOWN_BUILDINGS.MILL]: 0,
    [TOWN_BUILDINGS.MINE]: 0,
    [TOWN_BUILDINGS.FORGE]: 0,
    [TOWN_BUILDINGS.MARKET]: 0,
    [TOWN_BUILDINGS.MAGE_ACADEMY]: 0,
    [TOWN_BUILDINGS.QUESTIONABLE_CONCLAVE]: 0,
  },
  freeForgeToken: false,
  isGlitterfield: false,
};

export const townManagerSlice = createSlice({
  name: "townManager",
  initialState,
  reducers: {
    /// Global Reducers
    updateWeeklyIncome: (state) => {
      var weeklyIncome = {
        ...state.weeklyIncome,
        [RESOURCES.HUMANS]: 10 + state.buildings[TOWN_BUILDINGS.FARM],
        [RESOURCES.GOLD]: 0 + state.buildings[TOWN_BUILDINGS.MINE] * 10,
        [RESOURCES.SCAVENGED]: state.isGlitterfield ? 0 + state.buildings[TOWN_BUILDINGS.FARM] * 1 : 0,
      };
      return {
        ...state,
        weeklyIncome,
      };
    },
    generateResources: (state, action) => {
      var resources = { ...state.resources };
      var previousFightResources: { [key: string]: number } = {};

      Object.keys(action.payload).forEach((key) => {
        previousFightResources[key] = action.payload[key];
        resources[key as keyof typeof resources] = resources[key as keyof typeof resources] + action.payload[key];
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
        resources[key as keyof typeof resources] = resources[key as keyof typeof resources] - action.payload[key];
      });
      return {
        ...state,
        resources,
      };
    },

    createBuilding: (state, action: { payload: TOWN_BUILDINGS }) => {
      console.log(action.payload);
      if (!state.buildings[action.payload]) {
        state.buildings[action.payload] = 1;
      } else ++state.buildings[action.payload];
    },
    
    setGlitterfield: (state, action: { payload: boolean }) => {
      state.isGlitterfield = action.payload
    },

    /// Event reducers
    generateRandomResources: (state, action: { payload: number }) => {
      var resources = state.resources;

      Object.keys(resources).forEach((key) => {
        if (key !== RESOURCES.SCAVENGED) {
          var randomResource: number = Math.floor(Math.random() * action.payload);
          action.payload -= randomResource;
          resources[key as keyof typeof resources] = resources[key as keyof typeof resources] + randomResource;
        } else resources[key as keyof typeof resources] = resources[key as keyof typeof resources] + action.payload;
      });
    },

    balanceResources: (state, action: { payload: [RESOURCES] }) => {
      var resources = state.resources;
      console.log(action.payload);
      var totalResources: number = 0; 
      Object.keys(resources).forEach((key) => {
        if (action.payload.includes(key as RESOURCES)) {
          console.log(totalResources)
          totalResources += resources[key as keyof typeof resources];
        }
      })
      var splitValue: number = Math.floor(totalResources / action.payload.length);

      Object.keys(resources).forEach((key) => {
        if (action.payload.includes(key as RESOURCES)) {
          resources[key as keyof typeof resources] = splitValue;
        }
      })
    },
    updateForgeToken: (state, action: { payload: boolean }) => {
      state.freeForgeToken = action.payload;
    },

  },
});

export const { generateResources, updateWeeklyIncome, createBuilding, spendResources, setGlitterfield } = townManagerSlice.actions;

export default townManagerSlice.reducer;
