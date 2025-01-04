import "./buildingsPannel.scss";

import { TOWN_BUILDINGS } from "enums/TownBuildings";
import BuildingNode from "./components/buildingNode/BuildingNode";

interface BuildingsPannelProps {
  active?: boolean;
}

export default function BuildingsPannel({
  active = false,
}: BuildingsPannelProps) {
  return (
    <div className={`buildingsPannel${active ? "" : "-hidden"}`}>
      <h3 className="buildingsPannel__subtitle">Countryside</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.FARM} />
        <BuildingNode building={TOWN_BUILDINGS.MILL} />
        <BuildingNode building={TOWN_BUILDINGS.MINE} />
      </div>
      <h3 className="buildingsPannel__subtitle">Military Quarter</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.FORGE} />
        <BuildingNode building={TOWN_BUILDINGS.TOWER} />
      </div>
      <h3 className="buildingsPannel__subtitle">The Market</h3>
      <div className="buildingsPannel__section">[NYI]</div>
      <h3 className="buildingsPannel__subtitle">Mage Quarter</h3>
      <div className="buildingsPannel__section">[NYI]</div>
    </div>
  );
}
