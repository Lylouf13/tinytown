import { Tooltip } from "react-tooltip";
import { RESOURCES } from "enums/Resources";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { townBuildingDatabase } from "models/TownBuildings";

import "../customTooltip.scss";

interface BuildingTooltipProps {
  title: string;
  description: string;
  cost: { [key in RESOURCES]: number };
  count: number;
  required?: TOWN_BUILDINGS[];
}

export default function BuildingTooltip({
  title,
  description,
  cost,
  count,
  required,
}: BuildingTooltipProps) {
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${title}`}
      place="right"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{title.toUpperCase()}</h3>
      <p className="tooltip__text">{description}</p>
      <h3 className="tooltip__title">Cost</h3>
      <ul className="tooltip__data-col">
        {Object.values(RESOURCES).map(
          (resource: RESOURCES) =>
            cost[resource] > 0 && (
              <li className="tooltip__text tooltip__text-cost" key={resource}>
                {resource}: {cost[resource]}
              </li>
            )
        )}
      </ul>
      {required && required.length > 0 && (
        <>
          <h3 className="tooltip__title">
            Required talent{required.length > 1 && "s"}
          </h3>
          <ul className="tooltip__data-col">
            {required.map((building: TOWN_BUILDINGS) => (
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
      )}
    </Tooltip>
  );
}
