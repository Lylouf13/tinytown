import { useAppSelector } from "app/hooks";
import { unitDatabase } from "models/Units";

import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import UnitTrainingRow from "./components/unitTrainingRow/UnitTrainingRow";

import "./academyPannel.scss";

export default function AcademyPannel() {
  const armySelector = useAppSelector((state) => state.army);

  return (
    <div className="academy">
      <h1 className="academy__title">Academy</h1>
      <h2 className="academy__subtitle">
        Total strength :{" "}
        <span className="academy__text-red">{armySelector.totalStrength}</span>
      </h2>

      {/*   ICONS GENERATION  */}
      <div className="academy__iconContainer">
        {Object.keys(unitDatabase).map((unit) => (
            <UnitIcon key={`${unit}-unitIcon`} unit={unit} />
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
