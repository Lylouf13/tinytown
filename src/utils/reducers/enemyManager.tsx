import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    enemyForces: 8,
    weeklyForces: 10
}

const randomInt = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min;
export const enemyManagerSlice = createSlice({
    name: 'enemyManager',
    initialState,
    reducers:{
        generateEnemy: (state, action) => {
            var enemyForces = state.enemyForces + (state.weeklyForces * (action.payload+1)) + randomInt(0, action.payload*2)
            console.log(enemyForces)
            return{
                ...state,
                enemyForces
            }
        },
        // Destroys a set amount of forces
        destroyEnemy:(state, action) => {
            console.log(state.enemyForces + "-" + action.payload + " enemies performed")
            var enemyForces= state.enemyForces - action.payload
            enemyForces = enemyForces < 0 ? 0 : enemyForces
            return{
                ...state,
                enemyForces
            }
        },
        // Destroys all forces
        clearEnemy: (state) => {
            return{
                ...state,
                enemyForces: 0
            }
        }
    }
})

export const { generateEnemy, clearEnemy, destroyEnemy } = enemyManagerSlice.actions

export default enemyManagerSlice.reducer