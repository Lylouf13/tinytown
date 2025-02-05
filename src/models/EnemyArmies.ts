import { ENEMY_ARMIES } from "enums/EnemyArmies";
import { ATTACK_TYPES } from "enums/AttackTypes";

export interface EnemyArmies {
  name: string;
  enemyType: ENEMY_ARMIES;
  attackType: ATTACK_TYPES;
  forcesMultiplier: number;
  description: string;
  effect: string;
}

export const enemyArmiesDatabase: { [key in ENEMY_ARMIES]: EnemyArmies } = {
  [ENEMY_ARMIES.HIGHLANDERS]: {
    name: "Highlanders",
    enemyType: ENEMY_ARMIES.HIGHLANDERS,
    attackType: ATTACK_TYPES.NORMAL,
    forcesMultiplier: 1,
    description: "Highlanders are Barbarians, numerous, ferocious, with a taste for blood and not so much for strategy.",
    effect: "No special effect",
  },
  [ENEMY_ARMIES.HILL_GIANTS]: {
    name: "Hill Giants",
    enemyType: ENEMY_ARMIES.HILL_GIANTS,
    attackType: ATTACK_TYPES.CRUSHING,
    forcesMultiplier: 0.4,
    description: "Hill Giants are massive, and their size makes any defensive stance useless against them.",
    effect: "Ignores army defense",
  },

  [ENEMY_ARMIES.TWISTED_SATYRS]: {
    name: "Twisted Satyrs",
    enemyType: ENEMY_ARMIES.TWISTED_SATYRS,
    attackType: ATTACK_TYPES.TWISTED,
    forcesMultiplier: 0.7,
    description: "The Twisted Satyrs is a devious clan, they are able to bypass our frontlane and ambush us from the back",
    effect: "Ambushes ranged pack first"
  },
};
