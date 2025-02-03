import { ENEMY_ARMIES } from "enums/EnemyArmies";

export interface EnemyArmies {
  enemyType: ENEMY_ARMIES;
  forcesMultiplier: number;
  description: string;
}

export const ENEMY_ARMIES_DATABASE: { [key in ENEMY_ARMIES]: EnemyArmies } = {
  [ENEMY_ARMIES.HIGHLANDERS]: {
    enemyType: ENEMY_ARMIES.HIGHLANDERS,
    forcesMultiplier: 1,
    description: "Highlanders are Barbarians, numerous, ferocious, with a taste for blood and not so much for strategy.",
  },
  [ENEMY_ARMIES.HILL_GIANTS]: { 
    enemyType: ENEMY_ARMIES.HILL_GIANTS, 
    forcesMultiplier: 0.4, 
    description: "Hill Giants are massive, and their size makes any defensive stance useless against them." },
  [ENEMY_ARMIES.TWISTED_SATYRS]: { 
    enemyType: ENEMY_ARMIES.TWISTED_SATYRS, 
    forcesMultiplier: 0.7, 
    description: "The Twisted Satyrs is a devious clan, they are able to bypass our frontlane and ambush us from the back" },
};
