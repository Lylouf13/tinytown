import { useAppDispatch, useAppSelector } from "app/hooks";
import { setNextWeek, generateWeeklyHumans } from "utils/reducers/townManager";
import { generateEnemy } from "utils/reducers/enemyManager";

import Button from "components/button/Button";
import EconomyPannel from "features/economyPannel/EconomyPannel";
import AcademyPannel from "features/academyPannel/AcademyPannel";
import FightPannel from "features/fightPannel/FightPannel";
import ResourcesPannel from "features/resourcesPannel/ResourcesPannel";

import "./town.scss";

export default function Town() {
  const dispatch = useAppDispatch();
  const enemySelector = useAppSelector((state) => state.enemy);
  const townSelector = useAppSelector((state) => state.town);

  const nextWeek = () => {
    dispatch(setNextWeek());
    dispatch(generateWeeklyHumans());
    dispatch(generateEnemy(townSelector.week));
  };

  return (
    <div className="town">
      <h2>Week {townSelector.week}</h2>
      <img src="assets/TownTest.png" alt="villeTest" />
      <ResourcesPannel />
      <div className="flex-row">
        <p>{townSelector.humans} left to guide</p>
        <Button
          active={enemySelector.enemyForces === 0 ? true : false}
          label={"Next Week"}
          onClick={() => nextWeek()}
        />
      </div>
      <div className="flex-row">
        <EconomyPannel />
        <AcademyPannel />
        <FightPannel />
      </div>
    </div>
  );
}
