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
      place="left"
      offset={25}
      opacity={0.99}
    >
      <h3 className="tooltip__title">{unitData.name.toUpperCase()}</h3>
      <div className="tooltip__data">
        {Object.values(RESOURCES).map(
          (resource: RESOURCES) =>
            unitData.cost[resource] > 0 && (
              <p
                className="tooltip__text tooltip__text-cost tooltip__text-value"
                key={resource}
              >
                <img
                  className="tooltip__icon"
                  src={`assets/icons/resources/${resource}.png`}
                  alt={`icon-${resource}`}
                />{" "}
                {unitData.cost[resource]}
              </p>
            )
        )}
      </div>
      <p className="tooltip__text">{unitData.description}</p>
      <div className="tooltip__data">
        <p className="tooltip__text tooltip__text-strength tooltip__text-value">
          <img
            src={`assets/icons/misc/${
              unitData.ranged ? "range" : "melee"
            }StrengthIcon.png`}
            className="tooltip__icon"
            alt="strength"
          />{" "}
          {unitData.strength}
        </p>
        <p className="tooltip__text tooltip__text-defense tooltip__text-value">
          <img
            src={`assets/icons/misc/defenseIcon.png`}
            className="tooltip__icon"
            alt="defense"
          />{" "}
          {unitData.defense}
        </p>
      </div>

      {unitData.passives && unitData.passives.length > 0 && (
        <>
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
        </>
      )}
    </Tooltip>
  );
}
