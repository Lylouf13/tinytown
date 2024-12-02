import { useState } from "react";
import { AppThunk } from "app/store";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {clearEnemy, destroyEnemy } from "utils/reducers/enemyManager";
import { destroyUnits } from "utils/reducers/armyManager";
import { generateResources } from "utils/reducers/townManager";

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
      } else {
        setDefeat(true);
      }
    } catch (error) {
      console.error("Fight sequence error:", error);
    }
  };

  const handleFight = () => dispatch(fight());

  return (
    <div className="fight">
      <p>{enemySelector.enemyForces} at our doors</p>
      {defeat && <p>they took our town</p>}
      <Button
        active={enemySelector.enemyForces > 0 ? true : false}
        label="fight"
        onClick={handleFight}
      />

      {/* FIGHT RECAP */}
      <div className="fight__recap">
        <h2 className="fight__recap__title">Fight Recap</h2>
        {Object.keys(townSelector.previousFightResources).length > 0 && (
          <h3 className="fight__recap__title">Resources salvaged</h3>
        )}
        {townSelector.previousFightResources
          ? Object.keys(townSelector.previousFightResources).map(
              (resource) =>
                townSelector.previousFightResources[resource] > 0 && (
                  <p
                    className="fight__recap__text"
                    key={`resourceRecap - ${resource}`}
                  >{`${townSelector.previousFightResources[resource]} ${resource}`}</p>
                )
            )
          : null}

        {Object.keys(armySelector.lostUnits).length > 0 && (
          <h3 className="fight__recap__title">Units lost</h3>
        )}
        {armySelector.lostUnits
          ? Object.keys(armySelector.lostUnits).map((unit) => (
              <p
                className="fight__recap__text"
                key={`deathRecap - ${unit}`}
              >{`${armySelector.lostUnits[unit]} ${unit} lost`}</p>
            ))
          : null}
      </div>
    </div>
  );
}
