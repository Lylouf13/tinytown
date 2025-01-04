import { Tooltip } from "react-tooltip";
import { Unit } from "models/Units";
import { RESOURCES } from "enums/Resources";
import "./customTooltip.scss";

interface UnitTooltipProps {
  unitData: Unit;
}

export default function UnitTooltip({ unitData }: UnitTooltipProps) {
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${unitData.name}`}
      place="right"
    >
      <h3 className="tooltip__title">{unitData.name.toUpperCase()}</h3>
      <p className="tooltip__text">{unitData.description}</p>
      <div className="tooltip__data">
        <p className="tooltip__text tooltip__text-strength">
          Strength: {unitData.strength}
        </p>
        <p className="tooltip__text tooltip__text-defense">
          Defense: {unitData.defense}
        </p>
      </div>
      <h3 className="tooltip__title">Cost</h3>
      <div className="tooltip__data">
        <ul className="tooltip__data-col">
          {Object.values(RESOURCES).map(
            (resource: RESOURCES) =>
              unitData.cost[resource] > 0 && (
                <li className="tooltip__text tooltip__text-cost" key={resource}>
                  {resource}: {unitData.cost[resource]}
                </li>
              )
          )}
        </ul>
      </div>
      <h3 className="tooltip__title">Passives</h3>
      <div className="tooltip__data">
        {unitData.passives.map((passive: string) => (
          <p
            key={`${unitData.name}-tooltip-passive-${passive}`}
            className="tooltip__text tooltip__text-passive"
          >
            {passive}
          </p>
        ))}
      </div>
    </Tooltip>
  );
}
