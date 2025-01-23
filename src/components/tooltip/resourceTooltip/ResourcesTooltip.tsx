import { Tooltip } from "react-tooltip";
import { RESOURCES } from "enums/Resources";
import "../customTooltip.scss";

interface ResourcesTooltipProps {
  resource: RESOURCES;
}

export default function ResourcesTooltip({ resource }: ResourcesTooltipProps) {
  var resourceDescription: string = "";
  switch (resource) {
    case RESOURCES.GOLD:
      resourceDescription =
        "Gold is used in for training stronger units and building the town, it is mainly gained from vanquishing enemies";
      break;
    case RESOURCES.HUMANS:
      resourceDescription =
        `Humans are your most precious resource, they are mainly used to train units, but can also be used to build a stronger economy.
        More humans are generated each week`;
      break;
    case RESOURCES.SCAVENGED:
      resourceDescription = "Scavenged goods are useful for creating buildings and training some units, melee unit can grab some during the fights";
      break;
    case RESOURCES.SOULS:
      resourceDescription = "Souls are an ominous source of power, only used by fearsome leaders";
      break;
  }
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${resource}`}
      place="bottom"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{resource.toUpperCase()}</h3>
      <p className="tooltip__text">{resourceDescription}</p>
    </Tooltip>
  );
}
