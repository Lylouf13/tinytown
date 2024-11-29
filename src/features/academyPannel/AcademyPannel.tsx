import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUnit } from "../../utils/reducers/armyManager";
import { unitDatabase } from "../../models/Units";
import { removeHumans } from "../../utils/reducers/townManager";

import UnitIcon from "../../components/unitIcon/UnitIcon";
import UnitTrainingRow from "./unitTrainingRow/UnitTrainingRow";

import "./academyPannel.scss";

export default function AcademyPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const townSelector = useAppSelector((state) => state.town);

  const trainUnit = (quantity: number, unit: string) => {
    const cost = unitDatabase[unit].cost;
    if (townSelector.humans >= quantity * cost) {
      dispatch(removeHumans(quantity * cost));
      dispatch(addUnit({ unit, quantity }));
    }
  };

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
            <UnitIcon unit={unit} quantity={armySelector.units[unit]} />
          </div>
        ))}
      </div>

      {/*   UNIT PANNEL GENERATION  */}
      {Object.keys(unitDatabase).map((unit) => (
        <UnitTrainingRow
          key={`${unit}-trainingRow`}
          unit={unit}
          cost={unitDatabase[unit].cost}
          quantity={armySelector.units[unit]}
          currentHumans={townSelector.humans}
          trainUnit={trainUnit}
        />
      ))}
    </div>
  );
}
