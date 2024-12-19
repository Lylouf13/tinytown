import { useAppSelector } from "app/hooks";

import EconomyPannel from "features/economyPannel/EconomyPannel";
import AcademyPannel from "features/academyPannel/AcademyPannel";
import FightPannel from "features/fightPannel/FightPannel";
import ResourcesPannel from "features/resourcesPannel/ResourcesPannel";
import EnemyPannel from "features/enemyPannel/EnemyPannel";

import "./town.scss";

export default function Town() {
  const townSelector = useAppSelector((state) => state.town);
  const gameSelector = useAppSelector((state) => state.game);

  return (
    <div className="town">
      <div className="town__top">
        <h2 className="town__top__weeks">Week {gameSelector.week}</h2>
        <ResourcesPannel />
        <EnemyPannel />
      </div>
      <div className="flex-row">
        <p>{townSelector.humans} left to guide</p>
      </div>
      <FightPannel />
      <div className="flex-row">
        <EconomyPannel />
        <AcademyPannel />
      </div>
    </div>
  );
}
