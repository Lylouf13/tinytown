import { Tooltip } from "react-tooltip";
import { RESOURCES } from "enums/Resources";
import { Upgrade } from "models/UnitUpgrades";

import "../customTooltip.scss";

interface UpgradeTooltipProps {
  upgradeData: Upgrade;
}

export default function UpgradeTooltip({ upgradeData }: UpgradeTooltipProps) {
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${upgradeData.name}`}
      place="left"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{upgradeData.name.toUpperCase()}</h3>
      <p className="tooltip__text">{upgradeData.description}</p>
      <h3 className="tooltip__title">Cost</h3>
      <div className="tooltip__data">
        {Object.values(RESOURCES).map(
          (resource: RESOURCES) =>
            upgradeData.cost[resource] > 0 && (
              <p className="tooltip__text tooltip__text-cost" key={resource}>
                  <img
                    className="tooltip__icon"
                    src={`assets/icons/resources/${resource}.png`}
                    alt={`icon-${resource}`}
                  />{" "}
                  {upgradeData.cost[resource]}
                </p>
            )
        )}
      </div>
      {/* {upgradeData.requirements && upgradeData.requirements.length > 0 && (
        <>
          <h3 className="tooltip__title">
            Required upgrade{upgradeData.requirements.length > 1 && "s"}
          </h3>
          <ul className="tooltip__data-col">
            {upgradeData.requirements.map((upgrade: UNIT_UPGRADES) => (
              <li
                className={`tooltip__text ${
                  !unitUpgradesDatabase[upgrade].unlocked && "tooltip__text-required"
                }`}
                key={upgrade}
              >
                {upgrade}
              </li>
            ))}
          </ul>
        </>
      )} */}
    </Tooltip>
  );
}
