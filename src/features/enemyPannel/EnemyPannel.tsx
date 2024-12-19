import { useAppDispatch, useAppSelector } from "app/hooks";


import Button from "components/button/Button";
import "./enemyPannel.scss";
import { updateGameState, GAME_STATE } from "utils/reducers/gameManager";

export default function EnemyPannel() {
  const dispatch = useAppDispatch();
  //const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  //const townSelector = useAppSelector((state) => state.town);

  

  return (
    <div className="enemy">
      <p className="enemy__text--red">Enemies - {enemySelector.enemyForces}</p>
      <Button
        label="fight"
        onClick={() => dispatch(updateGameState(GAME_STATE.FIGHT))}
      />
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
