import { createSlice } from "@reduxjs/toolkit";
import { ENEMY_ARMIES } from "enums/EnemyArmies";
import {enemyArmiesDatabase} from "models/EnemyArmies";


const initialState = {
  enemyType: ENEMY_ARMIES.HIGHLANDERS,
  enemyForces: 7,
  weeklyForces: 5,
};

const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const enemyManagerSlice = createSlice({
  name: "enemyManager",
  initialState,
  reducers: {
    generateEnemy: (state, action) => {
      var enemyKeys: string[] = Object.keys(ENEMY_ARMIES);
      const currentType: ENEMY_ARMIES = enemyKeys[randomInt(0, enemyKeys.length - 1)] as ENEMY_ARMIES;
      var enemyType = ENEMY_ARMIES[currentType];

      var enemyForces = state.enemyForces + state.weeklyForces * (action.payload + 1) + randomInt(0, action.payload);
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
  },
});

export const { generateEnemy, clearEnemy, destroyEnemy } = enemyManagerSlice.actions;

export default enemyManagerSlice.reducer;
