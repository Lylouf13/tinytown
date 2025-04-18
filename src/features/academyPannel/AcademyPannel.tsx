import { useAppSelector } from "app/hooks";
import { unitDatabase } from "models/Units";
import { TOWN_BUILDINGS } from "enums/TownBuildings";

import UnitTrainingRow from "./components/unitTrainingRow/UnitTrainingRow";

import "./academyPannel.scss";
import ForgePannel from "features/forgePannel/ForgePannel";

export default function AcademyPannel() {
  const armySelector = useAppSelector((state) => state.army);
  const townSelector = useAppSelector((state) => state.town);

  return (
    <div className="academy">
      <img className="town__banner" src="assets/banners/AcademyBanner.png" alt="banner" />
      <div className="academy__pannel">
        <h1 className="academy__title">Academy</h1>
        <div className="academy__statContainer">
          <h2 className="academy__statContainer__stat">
            <img
              className="academy__statContainer__icon"
              alt="meleeStrength"
              src="assets/icons/misc/meleeStrengthIcon.png"
            />{" "}
            <span className="academy__statContainer__stat-red">
              {armySelector.meleeStrength}
            </span>
          </h2>
          <h2 className="academy__statContainer__stat">
            <img
              className="academy__statContainer__icon"
              alt="rangeStrength"
              src="assets/icons/misc/rangeStrengthIcon.png"
            />{" "}
            <span className="academy__statContainer__stat-red">
              {armySelector.rangedStrength}
            </span>
          </h2>
          <h2 className="academy__statContainer__stat">
            <img
              className="academy__statContainer__icon"
              alt="defense"
              src="assets/icons/misc/defenseIcon.png"
            />{" "}
            <span className="academy__statContainer__stat-blue">
              {armySelector.totalDefense}
            </span>
          </h2>
        </div>

        {/*   ICONS GENERATION  */}
        {/* <div className="academy__iconContainer">
          {Object.keys(unitDatabase).map((unit) => (
            <UnitIcon key={`${unit}-unitIcon`} unit={unit} />
          ))}
        </div> */}

        <h2 className="academy__subtitle">Training</h2>
        <div>
          {/*   UNIT TRAINING PANNEL GENERATION  */}
          {Object.keys(unitDatabase).map((unit) => (
            <UnitTrainingRow key={`${unit}-trainingRow`} unit={unit} />
          ))}
        </div>

        <h2 className="academy__subtitle">Forge</h2>
        {townSelector.buildings[TOWN_BUILDINGS.FORGE] !== 0 ? (
          <ForgePannel />
        ) : (
          <h3 className="academy__forge_subtext">Build a forge to upgrade units</h3>
        )}
      </div>
      <img className="town__banner" src="assets/banners/BannerBottom.png" alt="banner" />
    </div>
  );
}
