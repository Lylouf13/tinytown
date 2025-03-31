import { SPELLS } from "enums/Spells";
import "./buildingAction.scss";
import SpellTooltip from "components/tooltip/spellTooltip/SpellTooltip";

interface BuildingActionProps {
  name: SPELLS;
  active?: boolean;
  handleClick?: () => void;
}

export default function BuildingAction({
  name,
  active = false,
  handleClick,
}: BuildingActionProps) {
  return (
    <>
      <button className="buildingAction" data-tooltip-id={`tooltip-${name}`}>
        <img
          onClick={handleClick}
          className="buildingAction__icon"
          src={`assets/icons/spells/${name.toLowerCase()}${active ? "-active" : ""}.png`}
          alt={`buildingAction-${name}`}
        />
      </button>
      <SpellTooltip spell={name} />
    </>
  );
}
