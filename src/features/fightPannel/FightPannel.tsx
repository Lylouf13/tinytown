import "./fightPannel.scss";

import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { destroyEnemy, generateEnemy } from "utils/reducers/enemyManager";
import { destroyUnits, getMeleeCount, getRangedCount } from "utils/reducers/armyManager";
import { updateFightState, setNextWeek, updateGameState, FIGHT_STATE, GAME_STATE } from "utils/reducers/gameManager";
import { generateResources } from "utils/reducers/townManager";
import { sleep } from "utils/sleep";
import { RESOURCES } from "enums/Resources";

import Button from "components/button/Button";
import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";

export default function FightPannel() {
  const dispatch = useAppDispatch();
  const enemySelector = useAppSelector((state) => state.enemy);
  const gameSelector = useAppSelector((state) => state.game);
  const townSelector = useAppSelector((state) => state.town);

  const nextWeek = () => {
    dispatch(updateFightState(FIGHT_STATE.BEFORE));
    dispatch(updateGameState(GAME_STATE.PREPARATION));
    dispatch(setNextWeek());
    dispatch(generateResources(townSelector.weeklyIncome));
    dispatch(generateEnemy(gameSelector.week));
  };

  // const salvaPassive = () => dispatch(destroyEnemy(armySelector.passives.salva));

  const fightResources = (gold: number, scavenged: number, souls: number) => {
    return {
      [RESOURCES.GOLD]: gold,
      [RESOURCES.SCAVENGED]: scavenged,
      [RESOURCES.SOULS]: souls,
    };
  };

  const attack = (): AppThunk => async (dispatch, getState) => {
    var fight = true;
    var frontlane = false;

    try {
      let destroyedEnemies: number = 0;
      let damageTaken: number = 0;
      let generatedResources: { [key: string]: number } = {};

      while (fight) {
        const state = getState();
        const { game, army, enemy } = state;

        switch (game.fightState) {
          case FIGHT_STATE.BEFORE:
            dispatch(updateFightState(FIGHT_STATE.PRE_FIGHT));
            break;

          case FIGHT_STATE.PRE_FIGHT:
            await sleep(1500);
            if (army.meleeStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else if (army.rangedStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;

          case FIGHT_STATE.ATTACK_MELEE:
            await sleep(1500);

            destroyedEnemies = Math.min(army.meleeStrength, enemy.enemyForces);
            damageTaken = getMeleeCount(army.units) < enemy.enemyForces ? getMeleeCount(army.units) : enemy.enemyForces;
            generatedResources = fightResources(destroyedEnemies, army.passives.pillager, 0);
            frontlane = true;

            dispatch(destroyEnemy(destroyedEnemies));
            dispatch(destroyUnits(damageTaken));
            dispatch(generateResources(generatedResources));

            if (enemy.enemyForces <= 0) dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            else if (army.rangedStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else if (army.meleeStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;

          case FIGHT_STATE.ATTACK_RANGED:
            await sleep(1500);

            destroyedEnemies = Math.min(army.rangedStrength, enemy.enemyForces);
            damageTaken = frontlane ? 0 : Math.min(getRangedCount(army.units), enemy.enemyForces);
            generatedResources = fightResources(destroyedEnemies, 0, 0);
            frontlane = false;

            dispatch(destroyEnemy(army.rangedStrength));
            dispatch(destroyUnits(damageTaken));
            dispatch(generateResources(generatedResources));

            if (enemy.enemyForces <= 0) dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            else if (army.meleeStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else if (army.rangedStrength !== 0) dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
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
  } else if (gameSelector.fightState === FIGHT_STATE.ATTACK_MELEE && enemySelector.enemyForces !== 0) {
    displayPhase = "Melee Attacks !";
  } else if (gameSelector.fightState === FIGHT_STATE.ATTACK_RANGED && enemySelector.enemyForces !== 0) {
    displayPhase = "Ranged Attack !";
  } else {
    displayPhase = "Fight Recap";
  }

  return (
    <div className={`fight ${gameSelector.state === GAME_STATE.PREPARATION ? "fight-hidden" : ""}`}>
      <h2>Fight</h2>
      <div className="fight__overview"></div>
      <h3>{displayPhase}</h3>
      <div className="fight__art">
        <h4 className="fight__art__frame fight__art__frame-enemy"> Enemy forces - {enemySelector.enemyForces}</h4>
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
            <Button label="Cancel" onClick={() => dispatch(updateGameState(GAME_STATE.PREPARATION))} />
            <Button label={"Start Battle"} onClick={handleButtonClick} />
          </>
        )}
        {gameSelector.fightState === FIGHT_STATE.POST_FIGHT && <Button label="Back to Town" onClick={() => nextWeek()} />}
      </div>
    </div>
  );
}
