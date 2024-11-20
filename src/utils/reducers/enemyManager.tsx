import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    enemyForces: 0,
    weeklyForces: 5
}

export const enemyManagerSlice = createSlice({
    name: 'enemyManager',
    initialState,
    reducers:{
        generateForces: (state, action) => {
            var enemyForces = state.enemyForces + (state.weeklyForces * (action.payload+1))
            console.log(enemyForces)
            return{
                ...state,
                enemyForces
            }
        },
        // Destroys a set amount of forces
        destroyForces:(state, action) => {
            console.log(state.enemyForces + "-" + action.payload + " enemies performed")
            var enemyForces= state.enemyForces - action.payload

            return{
                ...state,
                enemyForces
            }
        },
        // Destroys all forces
        clearForces: (state) => {
            return{
                ...state,
                enemyForces: 0
            }
        }
    }
})

export const { generateForces, clearForces, destroyForces } = enemyManagerSlice.actions

export default enemyManagerSlice.reducer