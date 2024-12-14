import { Tooltip } from "react-tooltip";
import { RESOURCES } from "models/Enums";
import { UNIT_TALENTS, unitTalentsDatabase } from "models/UnitTalents";

import "../customTooltip.scss";

interface TalentTooltipProps {
  title: string;
  description: string;
  cost:{ [key in RESOURCES]: number };
  required?: UNIT_TALENTS[]
}

export default function TalentTooltip({
  title,
  description,
  cost,
  required
}: TalentTooltipProps) {
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
        {Object.values(RESOURCES).map((resource: RESOURCES) => (
          cost[resource] > 0 &&
          <li className="tooltip__text tooltip__text-cost" key={resource}>
            {resource}: {cost[resource]}
          </li>
        ))}
      </ul>
      {required && required.length > 0 && (
        <>
          <h3 className="tooltip__title">Required talent{ required.length > 1 && "s"}</h3>
          <ul className="tooltip__data-col">
            {required.map((talent: UNIT_TALENTS) => (
              <li className={`tooltip__text ${!unitTalentsDatabase[talent].unlocked && "tooltip__text-required"}`} key={talent}>
                {talent}
              </li>
            ))}
          </ul>
        </>
      )}
    </Tooltip>
  );
}
