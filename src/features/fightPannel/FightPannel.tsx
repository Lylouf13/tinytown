import { useState } from "react";
import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  clearEnemy,
  destroyEnemy,
  generateEnemy,
} from "utils/reducers/enemyManager";
import { destroyUnits } from "utils/reducers/armyManager";
import { updateFightState, generateResources, updateState } from "utils/reducers/townManager";
import { setNextWeek, generateWeeklyHumans } from "utils/reducers/townManager";

import Button from "components/button/Button";
import "./fightPannel.scss";

export default function FightPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  const townSelector = useAppSelector((state) => state.town);

  // CHANGE THIS TO USE REDUX -- TEST ONLY
  // Game win / loss state
  var [defeat, setDefeat] = useState(false);

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

  const fight = (): AppThunk => async (dispatch, getState) => {
    try {
      salvaPassive();

      const state = getState();
      const armyStrength = state.army.totalStrength;
      const remainingEnemyForces = state.enemy.enemyForces;

      if (armyStrength >= remainingEnemyForces) {
        dispatch(destroyUnits(remainingEnemyForces));
        dispatch(clearEnemy());
        generateFightResources(
          enemySelector.enemyForces,
          armySelector.passives.pillager,
          0
        );
        nextWeek();
      } else {
        setDefeat(true);
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };

  const handleFight = () => dispatch(fight());

  const attack = () => {
      salvaPassive();
      dispatch(destroyEnemy(armySelector.totalStrength));
      dispatch(updateFightState("defense"));
  };

  const defend = () => {
    if (armySelector.totalStrength >= enemySelector.enemyForces) {
      dispatch(destroyUnits(enemySelector.enemyForces));
      dispatch(clearEnemy());
      generateFightResources(
        enemySelector.enemyForces,
        armySelector.passives.pillager,
        0
      );
      nextWeek();
    } else {
      setDefeat(true);
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
          : townSelector.fightState === "defense"
          ? "Defense Phase"
          : "Fight Recap"}
      </h3>
      <div className="fight__art">
        <p> actual fight frfr</p>
      </div>
      <Button
        label={
          townSelector.fightState === "attack"
            ? "Attack"
            : townSelector.fightState === "defense"
            ? "Defend"
            : "Fight Recap"
        }
        onClick={
          townSelector.fightState === "attack"
            ? () => attack()
            : townSelector.fightState === "defense"
            ? () => defend()
            : () => console.log("recap")
        }
      />
      <Button
        label="Cancel"
        onClick={() => dispatch(updateState("preparation"))}
      />
    </div>
  );
}
