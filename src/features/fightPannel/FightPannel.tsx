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
  updateState,
} from "utils/reducers/townManager";
import { setNextWeek, generateWeeklyHumans } from "utils/reducers/townManager";

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
      dispatch(updateFightState("defense"))

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

  const handleAttack = () => dispatch(attack());

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
        dispatch(updateState("defeat"));
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };
  const handleDefend = () => dispatch(defend());
  const handleFightEnd = () => {
    dispatch(updateState("preparation"));
    dispatch(updateFightState("attack"));
    nextWeek();
  };

  const currentPhase = (): string => {
    switch (townSelector.fightState) {
      case "attack":
        return "Attack";
      case "defense":
        return enemySelector.enemyForces !== 0 ? "Defend" : "Back to Town";
      default:
        return "Back to Town";
    }
  };

  const handleButtonClick = () => {
    if (townSelector.fightState === "attack") {
      handleAttack();
    } else if (enemySelector.enemyForces !== 0) {
      handleDefend();
    } else {
      handleFightEnd();
    }
  };

  return (
    <div
      className={`fight ${
        townSelector.state === "preparation" ? "fight-hidden" : ""
      }`}
    >
      <h2>Fight</h2>
      <div className="fight__overview">
        <p>{armySelector.totalStrength}</p>
        <p>{enemySelector.enemyForces}</p>
      </div>
      <h3>
        {townSelector.fightState === "attack"
          ? "Attack Phase"
          : enemySelector.enemyForces !== 0
          ? "Defense Phase"
          : "Fight Recap"}
      </h3>
      <div className="fight__art">
        <p> actual fight frfr</p>
      </div>
      <Button label={currentPhase()} onClick={handleButtonClick} />
      {townSelector.fightState === "attack" && (
        <Button
          label="Cancel"
          onClick={() => dispatch(updateState("preparation"))}
        />
      )}
    </div>
  );
}
