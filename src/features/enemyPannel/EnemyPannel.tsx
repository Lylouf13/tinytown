import "./enemyPannel.scss";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { updateGameState, GAME_STATE } from "utils/reducers/gameManager";

import Button from "components/button/Button";
// import RerollButton from "./components/rerollButton";
import EnemyArmyTooltip from "components/tooltip/enemyArmyTooltip/EnemyArmyTooltip";

export default function EnemyPannel() {
  const dispatch = useAppDispatch();
  const enemySelector = useAppSelector((state) => state.enemy);
  var currentEnemy = enemySelector.enemyType

  return (
    <div className={`enemy enemy-${currentEnemy.toLowerCase()}`}>
      <p className={`enemy__title enemy__title-${currentEnemy.toLowerCase()}`}>Enemies | {enemySelector.enemyForces}</p>
      <img className="enemy__icon" src={`/assets/icons/enemies/EnemyIcon_${currentEnemy}.png`} alt="enemy type icon"
                data-tooltip-id={`tooltip-${currentEnemy.toLowerCase()}`}

      />
      <EnemyArmyTooltip army={currentEnemy} />
      <Button
        label="fight"
        color={currentEnemy.toLowerCase()}
        onClick={() => dispatch(updateGameState(GAME_STATE.FIGHT))}
      />
      {/* <RerollButton /> */}
      
      {/* 
      ---------
      ---------
      ---------
      OLD FIGHT RECAP, MIGHT BE USED AGAIN LATER IN FIGHT PANNEL
      ---------
      ---------
      ---------
      <div className="enemy__recap">
        <h2 className="enemy__recap__title">Fight Recap</h2>
        {Object.keys(townSelector.previousFightResources).length > 0 && (
          <h3 className="enemy__recap__title">Resources salvaged</h3>
        )}
        {townSelector.previousFightResources
          ? Object.keys(townSelector.previousFightResources).map(
              (resource) =>
                townSelector.previousFightResources[resource] > 0 && (
                  <p
                    className="enemy__recap__text"
                    key={`resourceRecap - ${resource}`}
                  >{`${townSelector.previousFightResources[resource]} ${resource}`}</p>
                )
            )
          : null}

        {Object.keys(armySelector.lostUnits).length > 0 && (
          <h3 className="enemy__recap__title">Units lost</h3>
        )}
        {armySelector.lostUnits
          ? Object.keys(armySelector.lostUnits).map((unit) => (
              <p
                className="enemy__recap__text"
                key={`deathRecap - ${unit}`}
              >{`${armySelector.lostUnits[unit]} ${unit} lost`}</p>
            ))
          : null}
      </div> */}
    </div>
  );
}
