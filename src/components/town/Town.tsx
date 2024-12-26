import { useAppSelector } from "app/hooks";

import EconomyPannel from "features/economyPannel/EconomyPannel";
import AcademyPannel from "features/academyPannel/AcademyPannel";
import FightPannel from "features/fightPannel/FightPannel";
import ResourcesPannel from "features/resourcesPannel/ResourcesPannel";
import EnemyPannel from "features/enemyPannel/EnemyPannel";
import Timeline from "features/timeline/Timeline";

import "./town.scss";

export default function Town() {
  const gameSelector = useAppSelector((state) => state.game);

  return (
    <div className="town">
      <div className="town__top">
        <h2 className="town__top__weeks">Week {gameSelector.week}</h2>
        <ResourcesPannel />
        <EnemyPannel />
      </div>
      {/* <Timeline /> - TBI */}
      <FightPannel />
      <div className="town__main">
        <div className="town__mainPannel">
          <img className="town__banner" src="assets/banners/EconomyBanner.png" alt="banner" />
          <EconomyPannel />
          <img className="town__banner" src="assets/banners/banner_bottom.png" alt="banner" />
        </div>
        <div className="town__mainPannel">
          <img className="town__banner" src="assets/banners/AcademyBanner.png" alt="banner" />
          <AcademyPannel />
        </div>
      </div>
    </div>
  );
}
