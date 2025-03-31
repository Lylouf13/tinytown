import { Tooltip } from "react-tooltip";
import { SPELLS } from "enums/Spells";

import "../customTooltip.scss";

interface SpellTooltipProps {
  spell: SPELLS
}

export default function SpellTooltip({
  spell
}: SpellTooltipProps) {

    const description: { [key in SPELLS]: string } = {
        [SPELLS.NONE]: "No spell selected.",
        [SPELLS.STORMSTRIKE]: "Increase the ranged units' strength by 1.",
        [SPELLS.FIREHEART]: "Increase the melee units' strength by 1.",
        [SPELLS.GLITTERFIELD]: "Farms also grant one scavenged resource each week.",
    }
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${spell}`}
      place="right"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{spell.toUpperCase()}</h3>
      <p className="tooltip__text">{description[spell]}</p>
      </Tooltip>
  );
}
