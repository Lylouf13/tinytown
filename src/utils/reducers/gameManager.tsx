import { createSlice } from "@reduxjs/toolkit";


export enum GAME_STATE {
    PREPARATION = "preparation",
    FIGHT = "fight",
    DEFEAT = "defeat",
  }
  export enum FIGHT_STATE {
    ATTACK = "attack",
    DEFENSE = "defense",
  }

type GameState = {
    state: GAME_STATE;
    fightState: FIGHT_STATE;
    week: number;
}

const initialState: GameState = {
    state: GAME_STATE.PREPARATION,
    fightState: FIGHT_STATE.ATTACK,
    week: 1
}

export const gameManagerSlice = createSlice({
    name: "gameManager",
    initialState,
    reducers: {
        setNextWeek: (state) => {
            return {
              ...state,
              week: state.week + 1,
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
          }
    }
});


export const {
    setNextWeek,
    updateGameState,
    updateFightState,
  } = gameManagerSlice.actions;
  
  export default gameManagerSlice.reducer;
  