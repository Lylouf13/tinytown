import { createSlice } from "@reduxjs/toolkit";

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
  week: number;
  humans: number;
  humansPerWeek: number;
};

const initialState: TownState = {
  resources: {
    [RESOURCES.GOLD]: 0,
    [RESOURCES.SCAVENGED]: 0,
    [RESOURCES.SOULS]: 0,
  },
  previousFightResources: {},
  week: 1,
  humans: 10,
  humansPerWeek: 10,
};

export const townManagerSlice = createSlice({
  name: "townManager",
  initialState,
  reducers: {
    setNextWeek: (state) => {
      return {
        ...state,
        week: state.week + 1,
      };
    },
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
  },
});

export const {
  setNextWeek,
  generateWeeklyHumans,
  removeHumans,
  generateResources,
} = townManagerSlice.actions;

export default townManagerSlice.reducer;
