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
import { checkResources } from "utils/resources/checkResources";
import { createTower, updateStats } from "utils/reducers/armyManager";

interface BuildingNodeProps {
  building: TOWN_BUILDINGS;
}

export default function BuildingNode({ building }: BuildingNodeProps) {
  const buildingData: Building = townBuildingDatabase[building];
  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);
  const armySelector = useAppSelector((state) => state.army);

  const buyBuilding = () => {
    if(building === TOWN_BUILDINGS.TOWER){
      if(armySelector.fortifications[building] < buildingData.maxCount ||
        !armySelector.fortifications[building] &&
      checkResources(townSelector.resources, buildingData.cost)){

        dispatch(createTower(TOWN_BUILDINGS.TOWER));
        dispatch(updateStats());
      }
    }
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
    <button
      className="buildingNode"
      onClick={() => buyBuilding()}
      data-tooltip-id={`tooltip-${building}`}
    >
      <div className="buildingNode__button" onClick={() => buyBuilding()}>
        <img
          className="buildingNode__icon"
          src={`assets/icons/buildings/${building}.png`}
          alt={`${building}-icon`}
        />
      </div>
      <h4 className="buildingNode__name">{buildingData.name}</h4>
      {townBuildingDatabase[building].maxCount > 1 && (
        <p className="buildingNode__count">{`${
          townSelector.buildings[building] > 0
            ? `${townSelector.buildings[building]}`
            : "0"
        }  `}/{buildingData.maxCount}</p>
      )}
      <BuildingTooltip buildingData={buildingData} />
    </button>
  );
}
