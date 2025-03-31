import { createSlice } from "@reduxjs/toolkit";
import { ENEMY_ARMIES } from "enums/EnemyArmies";
import {enemyArmiesDatabase} from "models/EnemyArmies";


const initialState = {
  enemyType: ENEMY_ARMIES.HIGHLANDERS,
  enemyForces: 7,
  weeklyForces: 5,
};

const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const enemyRoll = () => {
  var enemyKeys: string[] = Object.keys(ENEMY_ARMIES);
return(
  enemyKeys[randomInt(0, enemyKeys.length - 1)] as ENEMY_ARMIES
)
};
export const enemyManagerSlice = createSlice({
  name: "enemyManager",
  initialState,
  reducers: {
    generateEnemy: (state, action) => {
      var enemyType = enemyRoll()
      var globalMultiplier = (action.payload/4 +1)
      console.log(globalMultiplier)
      var enemyForces = state.enemyForces + state.weeklyForces * (action.payload + 1) + (randomInt(action.payload/3, action.payload)*globalMultiplier);
      enemyForces = Math.floor(enemyArmiesDatabase[enemyType].forcesMultiplier * enemyForces);
      return {
        ...state,
        enemyForces,
        enemyType,
      };
    },
    // Destroys a set amount of forces
    destroyEnemy: (state, action) => {
      var enemyForces = state.enemyForces - action.payload;
      enemyForces = enemyForces < 0 ? enemyForces = 0 : enemyForces;

      return {
        ...state,
        enemyForces,
      };
    },
    // Destroys all forces
    clearEnemy: (state) => {
      return {
        ...state,
        enemyForces: 0,
      };
    },
    rerollType: (state) => {
      var enemyType = state.enemyType
      while(enemyType === state.enemyType){
        enemyType = enemyRoll()
      }
      return {
        ...state,
        enemyType,
      };
    },

    /// Event Reducers
    divideEnemyForces: (state, action: { payload: number }) => {
      return {
        ...state,
        enemyForces: Math.floor(state.enemyForces * action.payload),
      };
    },
  },
});

export const { generateEnemy, clearEnemy, destroyEnemy, rerollType } = enemyManagerSlice.actions;

export default enemyManagerSlice.reducer;
