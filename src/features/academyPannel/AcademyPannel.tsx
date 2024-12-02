import { useAppSelector } from "app/hooks";
import { unitDatabase } from "models/Units";

import UnitIcon from "components/unitIcon/UnitIcon";
import UnitTrainingRow from "./unitTrainingRow/UnitTrainingRow";

import "./academyPannel.scss";

export default function AcademyPannel() {
  const armySelector = useAppSelector((state) => state.army);

  return (
    <div className="academy">
      <h1 className="academy__title">Academy</h1>
      <p>
        We represent an army of{" "}
        <span className="academy__text-red">{armySelector.totalStrength}</span>
      </p>

      {/*   ICONS GENERATION  */}
      <div className="academy__icons">
        {Object.keys(unitDatabase).map((unit) => (
          <div
            className="academy__icons__container"
            key={`${unit}-iconContainer`}
          >
            <UnitIcon unit={unit} />
          </div>
        ))}
      </div>

      {/*   UNIT TRAINING PANNEL GENERATION  */}
      {Object.keys(unitDatabase).map((unit) => (
        <UnitTrainingRow
          key={`${unit}-trainingRow`}
          unit={unit}
        />
      ))}
    </div>
  );
}
