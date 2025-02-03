import { createSlice } from "@reduxjs/toolkit";
import { UNIT_PASSIVES } from "enums/UnitPassives";
import { UNIT_TYPES } from "enums/UnitTypes";
import { unitDatabase } from "models/Units";
import { TOWN_BUILDINGS } from "enums/TownBuildings";

interface ArmyState {
  units: {
    [key: string]: number;
  };
  lostUnits: {
    [key: string]: number;
  }
  passives: {
    [key: string]: number;
  };
  fortifications:{
    [key: string]: number
  }
  totalStrength: number;
  totalDefense: number;
  meleeStrength: number;
  rangedStrength: number;
};

const initialState: ArmyState = {
  units: {
    [UNIT_TYPES.BERSERK]: 0,
    [UNIT_TYPES.BOWER]: 0,
    [UNIT_TYPES.GUARDIAN]: 0,
  },
  lostUnits: {},
  passives: {
    [UNIT_PASSIVES.PILLAGER]: 0,
    [UNIT_PASSIVES.SALVA]: 0,
    [UNIT_PASSIVES.DIVINER]: 0,
    [UNIT_PASSIVES.PROTECTOR]: 0
  },
  fortifications: {
    [TOWN_BUILDINGS.TOWER]: 0
  },
  totalStrength: 0,
  totalDefense: 0,
  meleeStrength: 0,
  rangedStrength: 0
};


// Takes current passives list, specified unit's passives and quantity to modify passives count accordingly
const modifyPassives = (
  currentPassives: { [key: string]: number },
  unitPassives: string[],
  quantity: number
) => {
  const passives = { ...currentPassives };
  unitPassives.forEach((passive) => {
    passives[passive] = passives[passive] + quantity;
    if (passives[passive] < 0) {
      passives[passive] = 0;
    }
  });
  return passives;
};

const modifyTotalStrength = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * unitDatabase[value].strength,
    0
  );
};

const modifyTotalDefense = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * unitDatabase[value].defense,
    0
  );
};

const modifyMeleeStrength = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * (unitDatabase[value].ranged? 0 : unitDatabase[value].strength),
    0
  );
};
const modifyRangedStrength = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * (unitDatabase[value].ranged ? unitDatabase[value].strength : 0),
    0
  );
};

export const getMeleeCount = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * (unitDatabase[value].ranged? 0 : 1),
    0
  );
};

export const getRangedCount = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total + units[value] * (unitDatabase[value].ranged ? 1 : 0),
    0
  );
};

export const armyManagerSlice = createSlice({
  name: "armyManager",
  initialState,
  reducers: {
    updateStats: (state) => {
      const totalDefense = modifyTotalDefense(state.units);
      const totalStrength = modifyTotalStrength(state.units);
      const meleeStrength = modifyMeleeStrength(state.units);
      const rangedStrength = modifyRangedStrength(state.units);


      return {
        ...state,
        totalDefense,
        totalStrength,
        meleeStrength,
        rangedStrength,
      }
    },
    addUnit: (state, action) => {
      var units: { [key: string]: number } = {
        ...state.units,
        [action.payload.unit]:
          state.units[action.payload.unit] + action.payload.quantity,
      };

      var passives: { [key: string]: number } = state.passives;
      passives = modifyPassives(
        passives,
        unitDatabase[action.payload.unit].passives,
        action.payload.quantity
      );

      var totalStrength = modifyTotalStrength(units);
      var totalDefense = modifyTotalDefense(units);
      var meleeStrength = modifyMeleeStrength(units);
      var rangedStrength = modifyRangedStrength(units);


      return {
        ...state,
        units,
        totalStrength,
        totalDefense,
        meleeStrength,
        rangedStrength,
        passives,
      };
    },
    // Destroy units after fight
    destroyUnits: (state, action) => {
      var units: { [key: string]: number } = { ...state.units };
      var lostUnits: { [key: string]: number } = {};
      var passives: { [key: string]: number } = state.passives;
      var totalStrength = state.totalStrength;
      var totalDefense = state.totalDefense;
      var meleeStrength = state.meleeStrength;
      var rangedStrength = state.rangedStrength;

      // Sets priority order for destruction, might move it outside of the function at some point to allow for modification
      const destructionOrder: UNIT_TYPES[] = [
        UNIT_TYPES.GUARDIAN,
        UNIT_TYPES.BERSERK,
        UNIT_TYPES.BOWER,
      ];

      action.payload -= state.fortifications[TOWN_BUILDINGS.TOWER] * 10;
      
      // Removes units, decrementing passives as necessary
      for (const unitDestroyed of destructionOrder) {
        while (action.payload > 0 && units[unitDestroyed] > 0) {
          units[unitDestroyed]--;
          lostUnits[unitDestroyed] = (lostUnits[unitDestroyed] || 0) + 1;
          passives = modifyPassives(
            passives,
            unitDatabase[unitDestroyed].passives,
            -1
          );
          action.payload -= unitDatabase[unitDestroyed].defense;
        }
        if (action.payload  <= 0) {
          totalStrength = modifyTotalStrength(units);
          totalDefense = modifyTotalDefense(units);
          meleeStrength = modifyMeleeStrength(units);
          rangedStrength = modifyRangedStrength(units);

          break;
        }
      }

      return {
        ...state,
        units,
        lostUnits,
        totalStrength,
        totalDefense,
        meleeStrength,
        rangedStrength,
        passives,
      };
    }
  },
});

export const { updateStats, addUnit, destroyUnits } = armyManagerSlice.actions;

export default armyManagerSlice.reducer;
