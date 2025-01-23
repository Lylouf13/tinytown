import "./fightPannel.scss";

import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { destroyEnemy, generateEnemy } from "utils/reducers/enemyManager";
import { destroyUnits } from "utils/reducers/armyManager";
import {
  updateFightState,
  setNextWeek,
  updateGameState,
  FIGHT_STATE,
  GAME_STATE,
} from "utils/reducers/gameManager";
import { generateResources } from "utils/reducers/townManager";
import { sleep } from "utils/sleep";

import Button from "components/button/Button";
import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";

export default function FightPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  const gameSelector = useAppSelector((state) => state.game);
  const townSelector = useAppSelector((state) => state.town);

  const nextWeek = () => {
    dispatch(setNextWeek());
    dispatch(generateResources(townSelector.weeklyIncome));
    dispatch(generateEnemy(gameSelector.week));
  };

  const salvaPassive = () =>
    dispatch(destroyEnemy(armySelector.passives.salva));

  const generateFightResources = (
    gold: number,
    scavenged: number,
    souls: number
  ) =>
    dispatch(
      generateResources({
        gold: gold ?? 0,
        scavenged: scavenged ?? 0,
        souls: souls ?? 0,
      })
    );

  const attack = (): AppThunk => async (dispatch, getState) => {
    console.log(
      "Attack thunk started, current fight state:",
      getState().game.fightState
    );

    try {
      let destroyedEnemies: number = 0;

      while (true) {
        const state = getState();
        const { game, army, enemy } = state;

        switch (game.fightState) {
          case FIGHT_STATE.BEFORE:
            console.log(game.fightState);
            dispatch(updateFightState(FIGHT_STATE.PRE_FIGHT));
            console.log(game.fightState);
            console.log(gameSelector.fightState);

            break;
          case FIGHT_STATE.PRE_FIGHT:
            console.log("Pre-fight state reached");
            await sleep(2000);
            await dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            break;
          case FIGHT_STATE.ATTACK_MELEE:
            await sleep(2000);
            destroyedEnemies += army.meleeStrength;
            dispatch(destroyEnemy(army.meleeStrength));
            dispatch(destroyUnits(army.meleeStrength));

            if (enemy.enemyForces === 0) {
              dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            } else if (army.rangedStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else if (army.meleeStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;
          case FIGHT_STATE.ATTACK_RANGED:
            await sleep(2000);
            destroyedEnemies += army.rangedStrength;
            dispatch(destroyEnemy(army.rangedStrength));
            if (enemy.enemyForces === 0) {
              dispatch(updateFightState(FIGHT_STATE.POST_FIGHT));
            } else if (army.meleeStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_MELEE));
            else if (army.rangedStrength !== 0)
              dispatch(updateFightState(FIGHT_STATE.ATTACK_RANGED));
            else dispatch(updateGameState(GAME_STATE.DEFEAT));
            break;
          case FIGHT_STATE.POST_FIGHT:
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
  var currentPhase = "";
  var displayPhase = "";
  const handleButtonClick = () => {
    dispatch(attack());
  };

  if (gameSelector.fightState === FIGHT_STATE.BEFORE) {
    currentPhase = "Start battle";
    displayPhase = "Prepare for battle";
  } else if (
    gameSelector.fightState === FIGHT_STATE.PRE_FIGHT) 
  {
    currentPhase = "Pre-fight";
    displayPhase = "Pre-fight";
  } else if (
    gameSelector.fightState === FIGHT_STATE.ATTACK_MELEE &&
    enemySelector.enemyForces !== 0
  ) {
    currentPhase = "Melee Attack";
    displayPhase = "Melee Attacks !";
  } else if (
    gameSelector.fightState === FIGHT_STATE.ATTACK_RANGED &&
    enemySelector.enemyForces !== 0
  ) {
    currentPhase = "Range Attack";
    displayPhase = "Ranged Attack !";
  } else {
    currentPhase = "Back to Town";
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
        <h4 className="fight__art__frame fight__art__frame-enemy">
          {" "}
          Enemy forces - {enemySelector.enemyForces}
        </h4>
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
          <Button
            label="Cancel"
            onClick={() => dispatch(updateGameState(GAME_STATE.PREPARATION))}
          />
        )}
        <Button label={currentPhase} onClick={() => handleButtonClick()} />
      </div>
    </div>
  );
}
