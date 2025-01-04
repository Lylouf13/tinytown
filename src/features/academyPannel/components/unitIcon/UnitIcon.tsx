import "./unitIcon.scss";
import { useAppSelector } from "app/hooks";
import { unitDatabase } from "models/Units";
import UnitTooltip from "components/tooltip/UnitTooltip";

interface UnitIconProps {
  unit: string;
  row?: boolean;
}

export default function UnitIcon({ unit, row }: UnitIconProps) {
  const armySelector = useAppSelector((state) => state.army);

  return (
    <div className={row ? "unitIcon unitIcon--row" : `unitIcon`}>
      <p className="unitIcon__caption">{armySelector.units[unit]}</p>
      <img
        className={
          armySelector.units[unit] > 0
            ? "unitIcon__image"
            : "unitIcon__image unitIcon__image--inactive"
        }
        key={`${unit}-img`}
        src={`/assets/icons/units/${unit}_icon.png`}
        alt={`${unit}-icon`}
        
        data-tooltip-id={`tooltip-${unitDatabase[unit].name}`}
      />
      <UnitTooltip
        unitData={unitDatabase[unit]}
      />
    </div>
  );
}
