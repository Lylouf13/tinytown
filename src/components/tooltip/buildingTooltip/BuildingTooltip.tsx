import { Tooltip } from "react-tooltip";
import { RESOURCES } from "enums/Resources";
import { Building } from "models/TownBuildings";

import "../customTooltip.scss";

interface BuildingTooltipProps {
  buildingData: Building
}

export default function BuildingTooltip({
  buildingData
}: BuildingTooltipProps) {
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${buildingData.name}`}
      place="right"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{buildingData.name.toUpperCase()}</h3>
      <p className="tooltip__text">{buildingData.description}</p>
      <h3 className="tooltip__title">Cost</h3>
      <div className="tooltip__data">
        {Object.values(RESOURCES).map(
          (resource: RESOURCES) =>
            buildingData.cost[resource] > 0 && (
              <p className="tooltip__text tooltip__text-cost" key={resource}>
                  <img
                    className="tooltip__icon"
                    src={`assets/icons/resources/${resource}.png`}
                    alt={`icon-${resource}`}
                  />{" "}
                  {buildingData.cost[resource]}
                </p>
            )
        )}
      </div>
      {/* {buildingData.requirements && buildingData.requirements.length > 0 && (
        <>
          <h3 className="tooltip__title">
            Required talent{buildingData.requirements.length > 1 && "s"}
          </h3>
          <ul className="tooltip__data-col">
            {buildingData.requirements.map((building: TOWN_BUILDINGS) => (
              <li
                className={`tooltip__text ${
                  !townBuildingDatabase[building].unlocked &&
                  "tooltip__text-required"
                }`}
                key={building}
              >
                {building}
              </li>
            ))}
          </ul>
        </>
      )} */}
    </Tooltip>
  );
}
