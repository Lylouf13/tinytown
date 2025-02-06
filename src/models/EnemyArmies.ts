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
    description: "Numerous, ferocious, with a taste for blood. The drums of war and the shouts of battle fill the air.",
    effect: "No special effect",
  },
  [ENEMY_ARMIES.HILL_GIANTS]: {
    name: "Hill Giants",
    enemyType: ENEMY_ARMIES.HILL_GIANTS,
    attackType: ATTACK_TYPES.CRUSHING,
    forcesMultiplier: 0.4,
    description: "The ground shakes, as misty figures of stone and earth rise from the ground.",
    effect: "Ignores army defense",
  },

  [ENEMY_ARMIES.TWISTED_SATYRS]: {
    name: "Twisted Satyrs",
    enemyType: ENEMY_ARMIES.TWISTED_SATYRS,
    attackType: ATTACK_TYPES.TWISTED,
    forcesMultiplier: 0.7,
    description: "The roots are moving, the swamp howls a wicked song, the satyrs are at our doors.",
    effect: "Ambushes ranged pack first"
  },
};
