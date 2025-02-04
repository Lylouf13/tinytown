import EconomyPannel from "features/economyPannel/EconomyPannel";
import AcademyPannel from "features/academyPannel/AcademyPannel";
import FightPannel from "features/fightPannel/FightPannel";
import ResourcesPannel from "features/resourcesPannel/ResourcesPannel";
import EnemyPannel from "features/enemyPannel/EnemyPannel";
import Timeline from "features/timeline/Timeline";

import "./town.scss";
import EventPannel from "features/eventPannel/EventPannel";

export default function Town() {
  return (
    <div className="town">
      <div className="town__top">
        <ResourcesPannel />
        <EnemyPannel />
      </div>
      <Timeline />
      <FightPannel />
      <EventPannel />
      <div className="town__main">
        <EconomyPannel />
        <AcademyPannel />
      </div>
    </div>
  );
}
