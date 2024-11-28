import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUnit } from "../../utils/reducers/armyManager";
import { UNIT_TYPES, unitDatabase } from "../../models/Units";
import { removeHumans } from "../../utils/reducers/townManager";
import Button from "../../components/button/Button";

import "./academyPannel.scss";

export default function AcademyPannel() {
  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const townSelector = useAppSelector((state) => state.town);

  const trainUnit = (quantity: number, unit: UNIT_TYPES) => {
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
        {Object.entries(unitDatabase).map((unit) => (
          <div
            className="academy__icons__container"
            key={`${unit[0]}-iconContainer`}
          >
            <p className="academy__icons__caption" key={`${unit[0]}-amount`}>
              {armySelector.units[unit[0]]}
            </p>
            <img
              className={
                armySelector.units[unit[0]] > 0
                  ? "academy__icon"
                  : "academy__icon academy__icon--inactive"
              }
              key={`${unit[0]}-img`}
              src={`/assets/icons/units/${unit[0]}_icon.png`}
              alt={`${unit[0]}-icon`}
            />
          </div>
        ))}
      </div>

      {/*   UNIT PANNEL GENERATION  */}
      {Object.entries(unitDatabase).map((unit) => (
        <div className="academy__unit" key={`${unit[0]}-div`}>
          <div className="flex-row">
            <div
              className="academy__icons__container academy__icons__container--row"
              key={`${unit[0]}-iconContainer`}
            >
              <p className="academy__icons__caption" key={`${unit[0]}-amount`}>
                {armySelector.units[unit[0]]}
              </p>
              <img
                className={
                  armySelector.units[unit[0]] > 0
                    ? "academy__icon"
                    : "academy__icon academy__icon--inactive"
                }
                key={`${unit[0]}-img`}
                src={`/assets/icons/units/${unit[0]}_icon.png`}
                alt={`${unit[0]}-icon`}
              />
            </div>
            <h3 key={`${unit[0]}-title`}>
              {unit[0]} ({unit[1].cost} human{unit[1].cost > 1 && "s"})
            </h3>
          </div>
          <div className="academy__unit__buttons">
            <Button
              key={`${unit[0]}-btn1`}
              active={unit[1].cost <= townSelector.humans}
              label={`Train 1 ${unit[0]}`}
              onClick={() => trainUnit(1, unit[0] as UNIT_TYPES)}
            />
            <Button
              key={`${unit[0]}-btn5`}
              active={unit[1].cost * 5 <= townSelector.humans}
              label={`Train 5 ${unit[0]}`}
              onClick={() => trainUnit(5, unit[0] as UNIT_TYPES)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
