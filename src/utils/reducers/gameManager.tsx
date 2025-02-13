import { createSlice } from "@reduxjs/toolkit";
import { EVENTS } from "enums/Events";

export enum GAME_STATE {
  PREPARATION = "preparation",
  FIGHT = "fight",
  DEFEAT = "defeat",
}
export enum FIGHT_STATE {
  BEFORE = "before",
  PRE_FIGHT = "pre-fight",
  ATTACK_MELEE = "attack_melee",
  ATTACK_RANGED = "attack_ranged",
  POST_FIGHT = "post-fight",
}

interface GameState {
  state: GAME_STATE;
  fightState: FIGHT_STATE;
  week: number;
  eventWeek: EVENTS;
  timelineState: number;
  timelineDuration: number;
}

const initialState: GameState = {
  state: GAME_STATE.PREPARATION,
  fightState: FIGHT_STATE.BEFORE,
  week: 1,
  eventWeek: EVENTS.NONE,
  timelineState:1,
  timelineDuration: 12,
};

export const gameManagerSlice = createSlice({
  name: "gameManager",
  initialState,
  reducers: { 
    setNextWeek: (state) => {
      const week = state.week + 1
      var eventWeek = state.eventWeek
      
      if (week === 2 ){
        eventWeek = EVENTS.ENTHUSIASTIC_MASONRY
      }
      
      return {
        ...state,
        week,
        eventWeek,
        timelineState:state.timelineState< state.timelineDuration ? state.timelineState+1 : 1
      };
    },
    updateGameState: (state, action) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    updateFightState: (state, action) => {
      return {
        ...state,
        fightState: action.payload,
      };
    },
  },
});

export const { setNextWeek, updateGameState, updateFightState } =
  gameManagerSlice.actions;

export default gameManagerSlice.reducer;
