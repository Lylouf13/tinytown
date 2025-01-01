import "./buildingNode.scss";

import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { townBuildingDatabase } from "models/TownBuildings";
import BuildingTooltip from "components/tooltip/buildingTooltip/BuildingTooltip";

interface BuildingNodeProps {
  building: TOWN_BUILDINGS;
}

export default function BuildingNode({ building }: BuildingNodeProps) {
  return (
    <>
      <button className="buildingNode" data-tooltip-id={`tooltip-${building}`}>
        <img
          className="buildingNode__icon"
          src={`assets/icons/buildings/${building}.png`}
          alt={`${building}-icon`}
        />
      </button>
      <BuildingTooltip
        title={townBuildingDatabase[building].name}
        description={townBuildingDatabase[building].description}
        cost={townBuildingDatabase[building].cost}
        count={townBuildingDatabase[building].count}
        required={townBuildingDatabase[building].requirements}
      />
    </>
  );
}
