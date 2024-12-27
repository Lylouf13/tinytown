import { useAppSelector } from "app/hooks";
import { unitDatabase } from "models/Units";

import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import UnitTrainingRow from "./components/unitTrainingRow/UnitTrainingRow";

import "./academyPannel.scss";

export default function AcademyPannel() {
  const armySelector = useAppSelector((state) => state.army);

  return (
    <div className="academy">
      <img
        className="town__banner"
        src="assets/banners/AcademyBanner.png"
        alt="banner"
      />
      <div className="academy__pannel">
        <h1 className="academy__title">Academy</h1>
        <div className="academy__statContainer">
          <h2 className="academy__statContainer__stat">
            Total strength :{" "}
            <span className="academy__statContainer__stat-red">
              {armySelector.totalStrength}
            </span>
          </h2>
          <h2 className="academy__statContainer__stat">
            Total defense :{" "}
            <span className="academy__statContainer__stat-blue">
              {armySelector.totalDefense}
            </span>
          </h2>
        </div>

        {/*   ICONS GENERATION  */}
        <div className="academy__iconContainer">
          {Object.keys(unitDatabase).map((unit) => (
            <UnitIcon key={`${unit}-unitIcon`} unit={unit} />
          ))}
        </div>

        {/*   UNIT TRAINING PANNEL GENERATION  */}
        {Object.keys(unitDatabase).map((unit) => (
          <UnitTrainingRow key={`${unit}-trainingRow`} unit={unit} />
        ))}
      </div>
    </div>
  );
}
