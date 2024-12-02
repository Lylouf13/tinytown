import UnitIcon from "components/unitIcon/UnitIcon";
import Button from "components/button/Button";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { addUnit } from "utils/reducers/armyManager";
import { removeHumans } from "utils/reducers/townManager";
import { unitDatabase } from "models/Units";

interface UnitTrainingRowProps {
  unit: string;
}

export default function UnitTrainingRow({
  unit,
}: UnitTrainingRowProps) {

  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);

  const trainUnit = (quantity: number, unit: string) => {
    const cost = unitDatabase[unit].cost;
    if (townSelector.humans >= quantity * cost) {
      dispatch(removeHumans(quantity * cost));
      dispatch(addUnit({ unit, quantity }));
    }
  }

  return (
    <div className="academy__unit" key={`${unit}-div`}>
      <div className="flex-row">
        <div
          className="academy__icons__container academy__icons__container--row"
          key={`${unit}-iconContainer`}
        >
          <UnitIcon unit={unit} row />
        </div>
        <h3 key={`${unit}-title`}>
          {unit} ({unitDatabase[unit].cost} human{unitDatabase[unit].cost > 1 && "s"})
        </h3>
      </div>
      <div className="academy__unit__buttons">
        <Button
          key={`${unit}-btn1`}
          active={unitDatabase[unit].cost <= townSelector.humans}
          label={`Train 1 ${unit}`}
          onClick={() => trainUnit(1, unit)}
        />
        <Button
          key={`${unit}-btn5`}
          active={unitDatabase[unit].cost * 5 <= townSelector.humans}
          label={`Train 5 ${unit}`}
          onClick={() => trainUnit(5, unit)}
        />
      </div>
    </div>
  );
}
