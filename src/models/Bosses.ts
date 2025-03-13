import { BOSSES } from "enums/Bosses";
import { RESOURCES } from "enums/Resources";
import { UNIT_TYPES } from "enums/UnitTypes";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { SliceAction } from "models/Slices";
import { ATTACK_TYPES } from "enums/AttackTypes";
import { WEEK_TYPES } from "enums/WeekTypes";
import { randomInt } from "utils/resources/random";
import { SEEKER } from "enums/Seeker";
import { ENEMY_ARMIES } from "enums/EnemyArmies";

export type bossEffect = {
  description: string;
  effect: SliceAction[];
};
export interface Boss {
  name: string;
  image: string;
  description: string;
  army: ENEMY_ARMIES;
  bossEffect: bossEffect;
}

export const bossDatabase: { [key in BOSSES]: Boss } = {
  [BOSSES.ARYA]: {
    name: "Eagle-Eyed Arya",
    image: "Arya",
    description: "They seek. Prowl. Hunt. The deadly troupe is here to harness trophies",
    army: ENEMY_ARMIES.HIGHLANDERS,
    bossEffect: {
      description: "Gain 1 gold per turn",
      effect: [
        {
          sliceName: "town",
          actionName: "add",
          payload: 1,
        },
      ],
    },
  },
  [BOSSES.TEMPLAR_KING]: {
    name: "Templar King",
    image: "TemplarKing",
    description: "Zealous and blinded by the light, they came to redeem our so-called sins",
    army: ENEMY_ARMIES.HIGHLANDERS,
    bossEffect: {
      description: "Gain 1 gold per turn",
      effect: [
        {
          sliceName: "town",
          actionName: "add",
          payload: 1,
        },
      ],
    },
  },
  [BOSSES.SATYR_LORD]: {
    name: "Satyr Lord",
    image: "SatyrLord",
    description: "The beastly lord of the satyrs ",
    army: ENEMY_ARMIES.HIGHLANDERS,
    bossEffect: {
      description: "Gain 1 gold per turn",
      effect: [
        {
          sliceName: "town",
          actionName: "add",
          payload: 1,
        },
      ],
    },
  },
  [BOSSES.STORM_CALLER]: {
    name: "Storm Caller",
    image: "StormCaller",
    description: "Terrible clouds grow around us, this tempest has nothing natural",
    army: ENEMY_ARMIES.HIGHLANDERS,
    bossEffect: {
      description: "Gain 1 gold per turn",
      effect: [
        {
          sliceName: "town",
          actionName: "add",
          payload: 1,
        },
      ],
    },
  },
};
