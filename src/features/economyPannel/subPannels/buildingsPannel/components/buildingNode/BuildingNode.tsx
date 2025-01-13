import "./buildingNode.scss";

import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { Building, townBuildingDatabase } from "models/TownBuildings";
import BuildingTooltip from "components/tooltip/buildingTooltip/BuildingTooltip";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  createBuilding,
  spendResources,
  updateWeeklyIncome,
} from "utils/reducers/townManager";
import { checkResources } from "utils/checkResources";

interface BuildingNodeProps {
  building: TOWN_BUILDINGS;
}

export default function BuildingNode({ building }: BuildingNodeProps) {
  const buildingData: Building = townBuildingDatabase[building];
  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);

  const buyBuilding = () => {
    if (
      (townSelector.buildings[building] < buildingData.maxCount ||
        !townSelector.buildings[building]) &&
      checkResources(townSelector.resources, buildingData.cost)
    ) {
      dispatch(createBuilding(building));
      dispatch(spendResources(buildingData.cost));
      dispatch(updateWeeklyIncome());
    }
  };
  return (
    <>
      {townBuildingDatabase[building].maxCount > 1 && <p>{`${
        townSelector.buildings[building] > 0
          ? `${townSelector.buildings[building]}`
          : "0"
      }  `}</p>}
      <button
        className="buildingNode"
        data-tooltip-id={`tooltip-${building}`}
        onClick={() => buyBuilding()}
      >
        <img
          className="buildingNode__icon"
          src={`assets/icons/buildings/${building}.png`}
          alt={`${building}-icon`}
        />
      </button>
      <BuildingTooltip buildingData={buildingData} />
    </>
  );
}
