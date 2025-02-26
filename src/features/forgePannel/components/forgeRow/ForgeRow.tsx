import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import { unitDatabase } from "models/Units";
import "./forgeRow.scss";

interface ForgeRowProps {
  unit: string;
}
export default function ForgeRow({ unit }: ForgeRowProps) {
  const unitData = unitDatabase[unit];

  return (
    <div className="forgeRow">
      <h3>{unitData.name}</h3>
      <p>
        <img
          className="forgeRow__stat"
          src={`assets/icons/misc/${unitData.ranged ? "range" : "melee"}StrengthIcon.png`}
          alt="unitStrength"
        />
        {unitData.strength}
        <img
          className="forgeRow__stat"
          src={`assets/icons/misc/defenseIcon.png`}
          alt="unitStrength"
        />
        {unitData.defense}
      </p>
    </div>
  );
}
