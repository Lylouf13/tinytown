import "./buildingsPannel.scss";
import { useState } from "react";

import { TOWN_BUILDINGS } from "enums/TownBuildings";
import BuildingNode from "./components/buildingNode/BuildingNode";
import BuildingAction from "./components/buildingAction/BuildingAction";

interface BuildingsPannelProps {
  active?: boolean;
}
export default function BuildingsPannel({
  active = false,
}: BuildingsPannelProps) {
  const [selectedMageSpell, setSelectedMageSpell] = useState("null");

  const handleClick = (spell: string) => {
    setSelectedMageSpell(spell);
  };

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
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.MARKET} />
      </div>
      <h3 className="buildingsPannel__subtitle">Mage Quarter</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.MAGE_TOWER} />
        <BuildingAction
          name={"fireHeart"}
          active={selectedMageSpell === "fireHeart"}
          handleClick={() => handleClick("fireHeart")}
        />
        <BuildingAction
          name={"glitterFields"}
          active={selectedMageSpell === "glitterFields"}
          handleClick={() => handleClick("glitterFields")}
        />
      </div>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.QUESTIONABLE_CONCLAVE} />
      </div>
    </div>
  );
}
