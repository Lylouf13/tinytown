import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  clearEnemy,
  destroyEnemy,
  generateEnemy,
} from "utils/reducers/enemyManager";
import { destroyUnits } from "utils/reducers/armyManager";
import {
  updateFightState,
  generateResources,
  updateGameState,
} from "utils/reducers/townManager";
import { setNextWeek, generateWeeklyHumans } from "utils/reducers/townManager";

import { FIGHT_STATE, GAME_STATE } from "utils/reducers/townManager";

import Button from "components/button/Button";
import "./fightPannel.scss";

export default function FightPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  const townSelector = useAppSelector((state) => state.town);

  const nextWeek = () => {
    dispatch(setNextWeek());
    dispatch(generateWeeklyHumans());
    dispatch(generateEnemy(townSelector.week));
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
    try {
      salvaPassive();
      dispatch(destroyEnemy(armySelector.totalStrength));
      dispatch(updateFightState(FIGHT_STATE.DEFENSE));

      if (getState().enemy.enemyForces === 0) {
        generateFightResources(
          enemySelector.enemyForces,
          armySelector.passives.pillager,
          0
        );
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };

  const defend = (): AppThunk => async (dispatch, getState) => {
    try {
      if (armySelector.totalDefense >= enemySelector.enemyForces) {
        dispatch(destroyUnits(enemySelector.enemyForces));
        dispatch(clearEnemy());
        generateFightResources(
          enemySelector.enemyForces,
          armySelector.passives.pillager,
          0
        );
      } else {
        dispatch(updateGameState(GAME_STATE.DEFEAT));
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };

  var currentPhase = "";
  var displayPhase = "";
  var handleButtonClick = () => {};

  if (townSelector.fightState === FIGHT_STATE.ATTACK) {
    currentPhase = "Attack";
    displayPhase = "Attack Phase";
    handleButtonClick = () => dispatch(attack());
  } else if (
    townSelector.fightState === FIGHT_STATE.DEFENSE &&
    enemySelector.enemyForces !== 0
  ) {
    currentPhase = "Defend";
    displayPhase = "Defense Phase";
    handleButtonClick = () => dispatch(defend());
  } else {
    currentPhase = "Back to Town";
    displayPhase = "Fight Recap";
    handleButtonClick = () => {
      dispatch(updateGameState(GAME_STATE.PREPARATION));
      dispatch(updateFightState(FIGHT_STATE.ATTACK));
      nextWeek();
    };
  }

  return (
    <div
      className={`fight ${
        townSelector.state === GAME_STATE.PREPARATION ? "fight-hidden" : ""
      }`}
    >
      <h2>Fight</h2>
      <div className="fight__overview">
        {townSelector.fightState === FIGHT_STATE.ATTACK&& <p className="fight__overview__text-red">{armySelector.totalStrength}</p>}
        {townSelector.fightState === FIGHT_STATE.DEFENSE&& <p className="fight__overview__text-blue">{armySelector.totalDefense}</p>}
        <p>{enemySelector.enemyForces}</p>
      </div>
      <h3>
        {displayPhase}
      </h3>
      <div className="fight__art">
        <p> actual fight frfr</p>
      </div>
      <Button label={currentPhase} onClick={() => handleButtonClick()} />
      {townSelector.fightState === FIGHT_STATE.ATTACK && (
        <Button
          label="Cancel"
          onClick={() => dispatch(updateGameState(GAME_STATE.PREPARATION))}
        />
      )}
    </div>
  );
}
