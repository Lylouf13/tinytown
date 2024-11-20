import { createSlice } from '@reduxjs/toolkit'

import { UNIT_TYPES, UNIT_PASSIVES, unitDatabase } from '../../models/Units'

type ArmyState = {
  units: {
    [key: string]: number
  }
  passives:{
    [key:string]: number
  }
  totalStrength: number;
}

const initialState: ArmyState = {
  units: {
    [UNIT_TYPES.BERSERK]:0,
    [UNIT_TYPES.BOWER]:0
    },
  passives:{
    [UNIT_PASSIVES.PILLAGER]:0,
    [UNIT_PASSIVES.SALVA]:0,
    [UNIT_PASSIVES.DIVINER]:0
  },
  totalStrength: 0,
}

export const armyManagerSlice = createSlice({
    name: 'armyManager',
    initialState,
    reducers:{
      addUnit: (state, action) => {
        var units: { [key: string]: number }={
          ...state.units,
          [action.payload.unit]: state.units[action.payload.unit] + action.payload.quantity
        }

        var passives: { [key: string]: number } = 
          Object.values(unitDatabase[action.payload.unit].passives).reduce((acc, passive: string) => {
            acc[passive] = (acc[passive]) + action.payload.quantity;
            return acc;
          }, { ...state.passives })

        var totalStrength = Object.keys(units).reduce(
          (total: number, value) => total + (units[value] * unitDatabase[value].strength),
          0
        )
        
        return{
            ...state,
            units,
            totalStrength,
            passives
          }
      }
    }
})

export const { addUnit } = armyManagerSlice.actions

export default armyManagerSlice.reducer