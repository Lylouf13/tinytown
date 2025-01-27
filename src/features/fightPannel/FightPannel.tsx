import "./fightPannel.scss";

import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { destroyEnemy, generateEnemy } from "utils/reducers/enemyManager";
import { destroyUnits, getMeleeCount } from "utils/reducers/armyManager";
import { updateFightState, setNextWeek, updateGameState, FIGHT_STATE, GAME_STATE } from "utils/reducers/gameManager";
import { generateResources } from "utils/reducers/townManager";
import { sleep } from "utils/sleep";

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
      gold: gold,
      scavenged: scavenged,
      souls: souls,
    };
  };
  
  const attack = (): AppThunk => async (dispatch, getState) => {
    var fight = true;

    try {
      let destroyedEnemies: number = 0;

      while (fight) {
        const state = getState();
        const { game, army, enemy } = state;

        switch (game.fightState) {
          case FIGHT_STATE.BEFORE:
            await dispatch(updateFightState(FIGHT_STATE.PRE_FIGHT));
            break;

          case FIGHT_STATE.PRE_FIGHT:
            await sleep(1000);
            await dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            break;

          case FIGHT_STATE.ATTACK_MELEE:
            await sleep(1000);
            if (enemy.enemyForces <= 0) {
              await dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
              break;
            }

            destroyedEnemies = Math.min(army.meleeStrength, enemy.enemyForces);

            await dispatch(destroyEnemy(destroyedEnemies));
            await dispatch(destroyUnits(getMeleeCount(army.units) < enemy.enemyForces ? getMeleeCount(army.units) : enemy.enemyForces));
            await dispatch(generateResources(fightResources(destroyedEnemies, army.passives.pillager, 0)));

            if (army.rangedStrength !== 0) await dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else if (army.meleeStrength !== 0) await dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;

          case FIGHT_STATE.ATTACK_RANGED:
            await sleep(1000);
            destroyedEnemies = Math.min(army.meleeStrength, enemy.enemyForces);
            await dispatch(destroyEnemy(army.rangedStrength));
            await dispatch(generateResources(fightResources(destroyedEnemies, 0, 0)));

            if (enemy.enemyForces <= 0) {
              await dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            } else if (army.meleeStrength !== 0) await dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else if (army.rangedStrength !== 0) await dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else await dispatch(updateGameState(GAME_STATE.DEFEAT));
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
          <div className="fight__art__frame-section fight__art__frame-section-melee">
            <UnitIcon unit="berserk" tooltip={false} />
            <UnitIcon unit="guardian" tooltip={false} />
          </div>

          <div className="fight__art__frame-section fight__art__frame-section-ranged">
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
