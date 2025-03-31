import "./fightPannel.scss";

import { AppThunk } from "app/store";
import { batch } from "react-redux";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { destroyEnemy, generateEnemy } from "utils/reducers/enemyManager";
import {
  destroyUnits,
  getMeleeCount,
  getRangedCount,
  resetVengefulPassive,
  updateSeeker,
  updateShields,
  updateStats,
} from "utils/reducers/armyManager";
import {
  updateFightState,
  setNextWeek,
  updateGameState,
  FIGHT_STATE,
  GAME_STATE,
} from "utils/reducers/gameManager";
import { generateResources } from "utils/reducers/townManager";
import { sleep } from "utils/sleep";

import { ENEMY_ARMIES } from "enums/EnemyArmies";
import { ATTACK_TYPES } from "enums/AttackTypes";
import { RESOURCES } from "enums/Resources";
import { SEEKER } from "enums/Seeker";

import { enemyArmiesDatabase } from "models/EnemyArmies";
import Button from "components/button/Button";
import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";

export default function FightPannel() {
  const dispatch = useAppDispatch();
  const enemySelector = useAppSelector((state) => state.enemy);
  const gameSelector = useAppSelector((state) => state.game);
  const townSelector = useAppSelector((state) => state.town);
  const armySelector = useAppSelector((state) => state.army);

  const nextWeek = () => {
    batch(() => {
      dispatch(resetVengefulPassive());
      dispatch(updateFightState(FIGHT_STATE.BEFORE));
      dispatch(updateGameState(GAME_STATE.PREPARATION));

      dispatch(setNextWeek());
      dispatch(generateResources(townSelector.weeklyIncome));
      dispatch(generateEnemy(gameSelector.week));
      dispatch(updateSeeker(SEEKER.NONE));
      dispatch(updateStats());
    });
  };

  const salvaPassive = () => {
    const salvaStrength = armySelector.passives.salva;
    const generatedResources = fightResources(salvaStrength, 0);
    batch(() => {
      dispatch(destroyEnemy(salvaStrength));
      dispatch(generateResources(generatedResources));
    });
  };

  const fightResources = (gold: number, scavenged: number) => {
    return {
      [RESOURCES.GOLD]: gold,
      [RESOURCES.SCAVENGED]: scavenged,
    };
  };

  const calculateResources = (
    seekerMode: SEEKER,
    destroyedEnemies: number,
    pillagers: number
  ) => {
    if (seekerMode !== SEEKER.NONE) {
      var totalGenerated = destroyedEnemies + pillagers;
      if (seekerMode === SEEKER.GOLDSEEKER) {
        return fightResources(totalGenerated, 0);
      } else if (seekerMode === SEEKER.SCAVENGESEEKER) {
        return fightResources(0, totalGenerated);
      }
    } else return fightResources(destroyedEnemies, pillagers);
  };

  const playerAttack = (
    destroyedEnemies: number,
    damageTaken: number,
    attackType: ATTACK_TYPES,
    generatedResources: { [key: string]: number }
  ) => {
    batch(() => {
      dispatch(destroyEnemy(destroyedEnemies));
      dispatch(destroyUnits({ damageTaken, attackType }));
      dispatch(generateResources(generatedResources));
    });
  };

  const attack = (): AppThunk => async (dispatch, getState) => {
    var fight: boolean = true;
    var isFrontlane: boolean = false;

    var secondAttack: boolean = false;
    var viciousPassive: boolean = true;
    var state = getState();

    try {
      let destroyedEnemies: number = 0;
      let damageTaken: number = 0;
      let attackType: ATTACK_TYPES = ATTACK_TYPES.NORMAL;
      let generatedResources: { [key: string]: number } = {};

      while (fight) {
        switch (getState().game.fightState) {
          case FIGHT_STATE.BEFORE:
            dispatch(updateFightState(FIGHT_STATE.PRE_FIGHT));
            break;

          case FIGHT_STATE.PRE_FIGHT:
            await sleep(1500);

            state = getState();

            if (state.enemy.enemyType !== ENEMY_ARMIES.TWISTED_SATYRS) salvaPassive();

            if (state.army.rangedShield)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else if (
              state.enemy.enemyType === ENEMY_ARMIES.TWISTED_SATYRS ||
              state.army.meleeStrength === 0
            ) {
              if (state.army.rangedStrength !== 0)
                dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
              else if (state.army.meleeStrength !== 0)
                dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
              else dispatch(updateGameState(GAME_STATE.DEFEAT));
            } else {
              if (state.army.meleeStrength !== 0)
                dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
              else dispatch(updateGameState(GAME_STATE.DEFEAT));
            }
            break;

          case FIGHT_STATE.ATTACK_MELEE:
            await sleep(1500);

            state = getState();
            destroyedEnemies = Math.min(
              state.army.meleeStrength + state.army.vengefulStrength,
              state.enemy.enemyForces
            );

            // Damage taken Check
            if (!state.army.meleeShield) {
              damageTaken = Math.min(
                getMeleeCount(state.army.units),
                state.enemy.enemyForces
              );
              if (viciousPassive && !secondAttack) {
                secondAttack = true;
              } else if (viciousPassive && secondAttack) {
                damageTaken -= armySelector.passives.vicious;
                viciousPassive = false;
                secondAttack = false;
              }
            } else {
              damageTaken = 0;
              dispatch(updateShields({ target: "melee", value: false }));
            }

            generatedResources = calculateResources(
              state.army.seeker,
              destroyedEnemies,
              state.army.passives.pillager
            ) as { [key: string]: number };
            attackType = enemyArmiesDatabase[state.enemy.enemyType].attackType;
            isFrontlane = true;

            playerAttack(destroyedEnemies, damageTaken, attackType, generatedResources);

            state = getState();

            if (state.enemy.enemyForces <= 0)
              dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            else if (state.army.rangedStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else if (state.army.meleeStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;

          case FIGHT_STATE.ATTACK_RANGED:
            await sleep(1500);

            state = getState();
            destroyedEnemies = Math.min(
              state.army.rangedStrength,
              state.enemy.enemyForces
            );
            if (isFrontlane || state.army.rangedShield) {
              damageTaken = 0;
              dispatch(updateShields({ target: "ranged", value: false }));
            } else
              damageTaken = Math.min(
                getRangedCount(state.army.units),
                state.enemy.enemyForces
              );

            generatedResources = calculateResources(
              state.army.seeker,
              destroyedEnemies,
              0
            ) as { [key: string]: number };
            attackType = enemyArmiesDatabase[state.enemy.enemyType].attackType;
            isFrontlane = true;
            attackType = enemyArmiesDatabase[state.enemy.enemyType].attackType;

            playerAttack(destroyedEnemies, damageTaken, attackType, generatedResources);

            isFrontlane = false;
            state = getState();

            if (state.enemy.enemyForces <= 0)
              dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            else if (state.army.meleeStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else if (state.army.rangedStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;

          case FIGHT_STATE.POST_FIGHT:
            fight = false;
            break;

          default:
            return;
        }

        await sleep(100);
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };

  const handleButtonClick = () => {
    dispatch(attack());
  };

  var displayPhase = "";
  if (gameSelector.fightState === FIGHT_STATE.BEFORE) {
    displayPhase = "Prepare for battle";
  } else if (gameSelector.fightState === FIGHT_STATE.PRE_FIGHT) {
    displayPhase = "Pre-fight";
  } else if (
    gameSelector.fightState === FIGHT_STATE.ATTACK_MELEE &&
    enemySelector.enemyForces !== 0
  ) {
    displayPhase = "Melee Attacks !";
  } else if (
    gameSelector.fightState === FIGHT_STATE.ATTACK_RANGED &&
    enemySelector.enemyForces !== 0
  ) {
    displayPhase = "Ranged Attack !";
  } else {
    displayPhase = "Fight Recap";
  }

  return (
    <div
      className={`fight ${
        gameSelector.state === GAME_STATE.PREPARATION ? "fight-hidden" : ""
      }`}
    >
      <h2>Fight</h2>
      <div className="fight__overview"></div>
      <h3>{displayPhase}</h3>
      <div className="fight__art">
        <img
          className="fight__art__image"
          src={`/assets/banners/enemies/EnemyArt_${enemySelector.enemyType}.png`}
          alt="enemy art"
        />
        <h4
          className={`fight__art__frame fight__art__frame-enemy-${enemySelector.enemyType.toLowerCase()}`}
        >
          {" "}
          Enemy forces - {enemySelector.enemyForces}
        </h4>
        <div className="fight__art__frame-army">
          <div
            className={`fight__art__frame-section fight__art__frame-section-melee ${
              displayPhase === "Melee Attacks !" ? "attack-animation" : ""
            }`}
          >
            <UnitIcon unit="berserk" tooltip={false} />
            <UnitIcon unit="guardian" tooltip={false} />
          </div>

          <div
            className={`fight__art__frame-section fight__art__frame-section-ranged ${
              displayPhase === "Ranged Attack !" ? "attack-animation" : ""
            }`}
          >
            <UnitIcon unit="bower" tooltip={false} />
          </div>
        </div>
      </div>
      <div className="fight__buttons">
        {gameSelector.fightState === FIGHT_STATE.BEFORE && (
          <>
            <Button
              label="Cancel"
              onClick={() => dispatch(updateGameState(GAME_STATE.PREPARATION))}
            />
            <Button label={"Start Battle"} onClick={handleButtonClick} />
            <Button label="skip" onClick={() => nextWeek()} color="highlander" />
          </>
        )}
        {gameSelector.fightState === FIGHT_STATE.POST_FIGHT && (
          <Button label="Back to Town" onClick={() => nextWeek()} />
        )}
      </div>
    </div>
  );
}
