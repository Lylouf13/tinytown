import { useAppDispatch, useAppSelector } from "app/hooks";


import Button from "components/button/Button";
import "./enemyPannel.scss";
import { updateState } from "utils/reducers/townManager";

export default function EnemyPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  const townSelector = useAppSelector((state) => state.town);

  

  return (
    <div className="enemy">
      <h2 className="enemy__title">Barbarian Camp</h2>
      <p className="enemy__text">They are <span className="enemy__text--red"> {enemySelector.enemyForces}</span> waiting to attack us</p>
      <Button
        label="fight"
        onClick={() => dispatch(updateState("fight"))}
      />

      {/* FIGHT RECAP */}
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
      </div>
    </div>
  );
}
