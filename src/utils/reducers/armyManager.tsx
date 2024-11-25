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

// Takes current passives list, specified unit's passives and quantity to modify passives count accordingly
const modifyPassives = (currentPassives:{[key: string]: number}, unitPassives: string[], quantity: number) => {
  const passives = {...currentPassives}
  unitPassives.forEach((passive) => {
      passives[passive] = passives[passive] + quantity
      if (passives[passive] < 0) {
        passives[passive] = 0
      }
  })
  return passives
}

const modifyTotalStrength = (units: {[key: string]: number}) => {
  return Object.keys(units).reduce((total: number, value) => total + (units[value] * unitDatabase[value].strength),
    0
  )
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

        var passives: { [key: string]: number } = state.passives
        passives = modifyPassives(passives, unitDatabase[action.payload.unit].passives, action.payload.quantity)

        var totalStrength = modifyTotalStrength(units)

        return{
            ...state,
            units,
            totalStrength,
            passives
          }
      },
      // Destroy units after fight
      destroyUnits: (state, action) => {
        var units: { [key: string]: number } = {...state.units}
        var passives: { [key: string]: number } = state.passives
        var totalStrength = state.totalStrength

        // Sets priority order for destruction, might move it outside of the function at some point to allow for modification
        const destructionOrder: UNIT_TYPES[] = [
          UNIT_TYPES.BERSERK,
          UNIT_TYPES.BOWER,
        ]

        // Removes units, decrementing passives as necessary
        for (const unitDestroyed of destructionOrder) {     
          while(action.payload > 0 && units[unitDestroyed] > 0){
            units[unitDestroyed]--
            passives = modifyPassives(passives, unitDatabase[unitDestroyed].passives, -1)
            action.payload --
          }
          if (action.payload === 0){ 
            totalStrength = modifyTotalStrength(units)
            break
          }
        }

      return{
        ...state,
        units,
        totalStrength,
        passives
      }
      }
    }
})

export const { addUnit, destroyUnits } = armyManagerSlice.actions

export default armyManagerSlice.reducer