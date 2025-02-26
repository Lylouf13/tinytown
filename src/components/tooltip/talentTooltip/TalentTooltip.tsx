import { Tooltip } from "react-tooltip";
import { RESOURCES } from "enums/Resources";
import { UNIT_TALENTS } from "enums/UnitUpgrades";
import { Talent } from "models/UnitUpgrades";
import { unitTalentsDatabase } from "models/UnitUpgrades";

import "../customTooltip.scss";

interface TalentTooltipProps {
  talentData: Talent
}

export default function TalentTooltip({
  talentData
}: TalentTooltipProps) {
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${talentData.name}`}
      place="right"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{talentData.name.toUpperCase()}</h3>
      <p className="tooltip__text">{talentData.description}</p>
      <h3 className="tooltip__title">Cost</h3>
      <ul className="tooltip__data-col">
        {Object.values(RESOURCES).map(
          (resource: RESOURCES) =>
            talentData.cost[resource] > 0 && (
              <li className="tooltip__text tooltip__text-cost" key={resource}>
                {resource}: {talentData.cost[resource]}
              </li>
            )
        )}
      </ul>
      {talentData.requirements && talentData.requirements.length > 0 && (
        <>
          <h3 className="tooltip__title">
            Required talent{talentData.requirements.length > 1 && "s"}
          </h3>
          <ul className="tooltip__data-col">
            {talentData.requirements.map((talent: UNIT_TALENTS) => (
              <li
                className={`tooltip__text ${
                  !unitTalentsDatabase[talent].unlocked &&
                  "tooltip__text-required"
                }`}
                key={talent}
              >
                {talent}
              </li>
            ))}
          </ul>
        </>
      )}
    </Tooltip>
  );
}
