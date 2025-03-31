import { createSlice } from "@reduxjs/toolkit";
import { UNIT_PASSIVES } from "enums/UnitPassives";
import { UNIT_TYPES } from "enums/UnitTypes";
import { unitDatabase } from "models/Units";
import { unitUpgradesDatabase } from "models/UnitUpgrades";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { ATTACK_TYPES } from "enums/AttackTypes";
import { SEEKER } from "enums/Seeker";
import { SPELLS } from "enums/Spells";
import { UNIT_UPGRADES } from "enums/UnitUpgrades";

interface ArmyState {
  units: {
    [key: string]: number;
  };
  lostUnits: {
    [key: string]: number;
  };
  passives: {
    [key: string]: number;
  };
  unlockedUnitUpgrades: UNIT_UPGRADES[];
  fortifications: {
    [key: string]: number;
  };
  totalStrength: number;
  totalDefense: number;
  meleeStrength: number;
  rangedStrength: number;

  meleeShield: boolean;
  rangedShield: boolean;
  seeker: SEEKER;
  activeSpell: SPELLS;
  vengefulStrength: number;
}

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
    [UNIT_PASSIVES.VICIOUS]: 0,
    [UNIT_PASSIVES.VENGEFUL]: 0,
    [UNIT_PASSIVES.PROTECTOR]: 0,
  },
  unlockedUnitUpgrades: [],
  fortifications: {
    [TOWN_BUILDINGS.TOWER]: 0,
  },
  totalStrength: 0,
  totalDefense: 0,
  meleeStrength: 0,
  rangedStrength: 0,

  meleeShield: false,
  rangedShield: false,
  seeker: SEEKER.NONE,
  activeSpell: SPELLS.NONE,
  vengefulStrength: 0,
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

const modifyTotalStrength = (units: { [key: string]: number }, spell: SPELLS) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total +
      units[value] *
        (unitDatabase[value].strength + (spell === SPELLS.FIREHEART ? 1 : 0)),
    0
  );
};

const modifyTotalDefense = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) => total + units[value] * unitDatabase[value].defense,
    0
  );
};

const modifyMeleeStrength = (units: { [key: string]: number }, spell: SPELLS) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total +
      units[value] *
        (unitDatabase[value].ranged
          ? 0
          : unitDatabase[value].strength + (spell === SPELLS.FIREHEART ? 1 : 0)),
    0
  );
};
const modifyRangedStrength = (units: { [key: string]: number }, spell: SPELLS) => {
  return Object.keys(units).reduce(
    (total: number, value) =>
      total +
      units[value] *
        (unitDatabase[value].ranged
          ? unitDatabase[value].strength + (spell === SPELLS.STORMSTRIKE ? 1 : 0)
          : 0),
    0
  );
};

export const getMeleeCount = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) => total + units[value] * (unitDatabase[value].ranged ? 0 : 1),
    0
  );
};

export const getRangedCount = (units: { [key: string]: number }) => {
  return Object.keys(units).reduce(
    (total: number, value) => total + units[value] * (unitDatabase[value].ranged ? 1 : 0),
    0
  );
};

export const createUnit = (unit: string, quantity: number, state: ArmyState) => {
  var units: { [key: string]: number } = {
    ...state.units,
    [unit]: state.units[unit] + quantity,
  };

  var passives: { [key: string]: number } = state.passives;
  passives = modifyPassives(passives, unitDatabase[unit].passives, quantity);

  var totalStrength = modifyTotalStrength(units, state.activeSpell);
  var totalDefense = modifyTotalDefense(units);
  var meleeStrength = (modifyMeleeStrength(units, state.activeSpell) + state.vengefulStrength);
  var rangedStrength = modifyRangedStrength(units, state.activeSpell)  + state.fortifications[TOWN_BUILDINGS.TOWER]*5;

  return {
    ...state,
    units,
    totalStrength,
    totalDefense,
    meleeStrength,
    rangedStrength,
    passives,
  };
};

export const armyManagerSlice = createSlice({
  name: "armyManager",
  initialState,
  reducers: {
    updateStats: (state) => {
      const totalDefense = modifyTotalDefense(state.units);
      const totalStrength = modifyTotalStrength(state.units, state.activeSpell);
      const meleeStrength = (modifyMeleeStrength(state.units, state.activeSpell)  + state.vengefulStrength);
      const rangedStrength = (modifyRangedStrength(state.units, state.activeSpell) + state.fortifications[TOWN_BUILDINGS.TOWER]*5);

      return {
        ...state,
        totalDefense,
        totalStrength,
        meleeStrength,
        rangedStrength,
      };
    },
    addUnit: (state, action) => {
      return createUnit(action.payload.unit, action.payload.quantity, state);
    },
    // Destroy units after fight
    destroyUnits: (state, action) => {
      var units: { [key: string]: number } = { ...state.units };
      var lostUnits: { [key: string]: number } = {};
      var passives: { [key: string]: number } = state.passives;
      var totalStrength = state.totalStrength;
      var totalDefense = state.totalDefense;
      var meleeStrength = state.meleeStrength;
      var rangedStrength = state.rangedStrength  + state.fortifications[TOWN_BUILDINGS.TOWER]*5;
      var vengefulStrength = state.vengefulStrength;

      var damageTaken = action.payload.damageTaken! || action.payload;
      var attackType: string = action.payload.attackType || ATTACK_TYPES.NORMAL;

      var destructionOrder: UNIT_TYPES[] = [
        UNIT_TYPES.GUARDIAN,
        UNIT_TYPES.BERSERK,
        UNIT_TYPES.BOWER,
      ];

      var currentDestructionOrder = [...destructionOrder];

      if (attackType === ATTACK_TYPES.TWISTED && state.rangedStrength > 0) {
        currentDestructionOrder = destructionOrder.reverse();
      } else currentDestructionOrder = destructionOrder;


      // Removes units, decrementing passives as necessary
      for (const unitDestroyed of currentDestructionOrder) {
        while (damageTaken > 0 && units[unitDestroyed] > 0) {
          units[unitDestroyed]--;
          lostUnits[unitDestroyed] = (lostUnits[unitDestroyed] || 0) + 1;
          if (unitDatabase[unitDestroyed].passives.includes(UNIT_PASSIVES.VENGEFUL)) {
            vengefulStrength += Math.floor(unitDatabase[unitDestroyed].strength / 2);
          }
          if(unitDatabase[unitDestroyed].passives.includes(UNIT_PASSIVES.VETERAN)){
            units[UNIT_TYPES.BERSERK] += 1
          }
          passives = modifyPassives(passives, unitDatabase[unitDestroyed].passives, -1);
          if (attackType === ATTACK_TYPES.CRUSHING) {
            damageTaken -= 1;
          } else damageTaken -= unitDatabase[unitDestroyed].defense;
        }
        if (damageTaken <= 0) {
          totalStrength = modifyTotalStrength(units, state.activeSpell);
          totalDefense = modifyTotalDefense(units);
          meleeStrength = (modifyMeleeStrength(units, state.activeSpell) + vengefulStrength);
          rangedStrength = modifyRangedStrength(units, state.activeSpell)  + state.fortifications[TOWN_BUILDINGS.TOWER]*5;
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
        vengefulStrength,
        passives,
      };
    },
    resetVengefulPassive: (state) => {
      return {
        ...state,
        vengefulStrength: 0,
      };
    },

    unlockUnitUpgrade: (state, action: { payload: UNIT_UPGRADES }) => {
      if (!state.unlockedUnitUpgrades.includes(action.payload)) {
        state.unlockedUnitUpgrades.push(action.payload);
        unitUpgradesDatabase[action.payload].unlocked = true;
        unitUpgradesDatabase[action.payload].effect();
      }
    },

    updateSpell: (state, action: { payload: SPELLS }) => {
      return {
        ...state,
        activeSpell: action.payload,
      };
    },

    createTower: (state, action: { payload: TOWN_BUILDINGS }) => {
      if (!state.fortifications[action.payload]) {
        state.fortifications[action.payload] = 1;
      } else ++state.fortifications[action.payload];
    },
    /// Event Reducers
    ///// NEED TO REFACTOR THE WAY I CREATE UNITS
    addMostFormedUnit: (state, action: { payload: number }) => {
      var units: { [key: string]: number } = { ...state.units };
      var mostFormedChecker: number = 0;
      var mostFormed: string = "";
      var totalStrength: number = state.totalStrength;

      if (totalStrength > 0) {
        Object.keys(units).forEach((key) => {
          if (units[key] >= mostFormedChecker) {
            mostFormed = key;
          }
        });
        return createUnit(mostFormed, action.payload, state);
      } else {
        return createUnit("berserk", action.payload, state);
      }
    },
    updateShields: (
      state,
      action: { payload: { target: "melee" | "ranged" | "both"; value: boolean } }
    ) => {
      var meleeShield = state.meleeShield;
      var rangedShield = state.rangedShield;
      if (action.payload.target === "melee") meleeShield = action.payload.value;
      if (action.payload.target === "ranged") rangedShield = action.payload.value;
      if (action.payload.target === "both") {
        meleeShield = action.payload.value;
        rangedShield = action.payload.value;
      }

      return {
        ...state,
        meleeShield,
        rangedShield,
      };
    },
    updateSeeker: (state, action: { payload: SEEKER }) => {
      return {
        ...state,
        seeker: action.payload,
      };
    },
  },
});

export const {
  updateStats,
  addUnit,
  destroyUnits,
  updateShields,
  unlockUnitUpgrade,
  createTower,
  updateSeeker,
  updateSpell,
  resetVengefulPassive,
} = armyManagerSlice.actions;

export default armyManagerSlice.reducer;
