import { createSlice } from "@reduxjs/toolkit";

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
  timelineState: number;
  timelineDuration: number;
}

const initialState: GameState = {
  state: GAME_STATE.PREPARATION,
  fightState: FIGHT_STATE.BEFORE,
  week: 1,
  timelineState:1,
  timelineDuration: 12,
};

export const gameManagerSlice = createSlice({
  name: "gameManager",
  initialState,
  reducers: { 
    setNextWeek: (state) => {
      return {
        ...state,
        week: state.week + 1,
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
