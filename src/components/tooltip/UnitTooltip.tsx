import { Tooltip } from "react-tooltip";
import "./customTooltip.scss";

interface UnitTooltipProps {
  title: string;
  description: string;
  strength?: number;
  defense?: number;
  cost?: number;
  passives: string[];
}

export default function UnitTooltip({
  title,
  description,
  strength,
  defense,
  cost,
  passives,
}: UnitTooltipProps) {
  return (
    <Tooltip
      className="tooltip"
      id={`tooltip-${title}`}
      place="right"
      disableStyleInjection
    >
      <h3 className="tooltip__title">{title.toUpperCase()}</h3>
      <p className="tooltip__text">{description}</p>
      <div className="tooltip__data">
        {strength && (
          <p className="tooltip__text tooltip__text-strength">
            Strength: {strength}
          </p>
        )}
        {defense && (
          <p className="tooltip__text tooltip__text-defense">
            Defense: {defense}
          </p>
        )}
        {cost && (
          <p className="tooltip__text tooltip__text-cost">Cost: {cost}</p>
        )}
      </div>
      <h3 className="tooltip__title">Passives</h3>
      <div className="tooltip__data">
        {passives.map((passive: string) => (
          <p
            key={`${title}-tooltip-passive-${passive}`}
            className="tooltip__text tooltip__text-passive"
          >
            {passive}
          </p>
        ))}
      </div>
    </Tooltip>
  );
}
