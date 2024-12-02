import { Tooltip } from "react-tooltip";
import "./customTooltip.scss";

interface CustomTooltipProps {
  title: string;
  description: string;
  strength?: number;
  cost?: number;
  passives: string[];
}

export default function UnitTooltip({
  title,
  description,
  strength,
  cost,
  passives,
}: CustomTooltipProps) {
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
          <p className="tooltip__text tooltip__text--strength">
            Strength: {strength}
          </p>
        )}
        {cost && (
          <p className="tooltip__text tooltip__text--cost">Cost: {cost}</p>
        )}
      </div>
      <h3 className="tooltip__title">Passives</h3>
      <div className="tooltip__data">
        {passives.map((passive: string) => (
          <p key={`${title}-tooltip-passive-${passive}`} className="tooltip__text tooltip__text--passive">{passive}</p>
        ))}
      </div>
    </Tooltip>
  );
}
