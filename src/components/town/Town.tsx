import { useAppSelector } from "app/hooks";

import EconomyPannel from "features/economyPannel/EconomyPannel";
import AcademyPannel from "features/academyPannel/AcademyPannel";
import FightPannel from "features/fightPannel/FightPannel";
import ResourcesPannel from "features/resourcesPannel/ResourcesPannel";
import EnemyPannel from "features/enemyPannel/EnemyPannel";

import "./town.scss";

export default function Town() {
  const townSelector = useAppSelector((state) => state.town);

  return (
    <div className="town">
      <h2>Week {townSelector.week}</h2>
      <img src="assets/TownTest.png" alt="villeTest" />
      <ResourcesPannel />
      <div className="flex-row">
        <p>{townSelector.humans} left to guide</p>
      </div>
        <FightPannel />
      <div className="flex-row">
        <EconomyPannel />
        <AcademyPannel />
        <EnemyPannel />
      </div>
    </div>
  );
}
