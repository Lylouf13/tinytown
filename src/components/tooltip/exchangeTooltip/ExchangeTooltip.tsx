import "../customTooltip.scss";
import { Tooltip } from "react-tooltip";
interface ExchangeTooltipProps {
  action: string;
  spent: { [key: string]: number };
  gained: { [key: string]: number };
  tooltip: string;
}
export default function ExchangeTooltip({
  action,
  spent,
  gained,
  tooltip,
}: ExchangeTooltipProps) {
  const resourceSpent = Object.keys(spent)[0];
  const resourceGained = Object.keys(gained)[0];

  console.log(spent[resourceSpent]);
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={tooltip}
      place="right"
      opacity={0.99}
    >
      <p className="tooltip__text">
        {action === "Buy" ? "Spend" : action} {spent[resourceSpent]}{" "}
        <img className="tooltip__icon" alt="spent resource icon" src={`assets/icons/resources/${resourceSpent}.png`} /> for{" "}
        {gained[resourceGained]}{" "}
        <img className="tooltip__icon" alt="gained resource icon" src={`assets/icons/resources/${resourceGained}.png`} />
      </p>
    </Tooltip>
  );
}
