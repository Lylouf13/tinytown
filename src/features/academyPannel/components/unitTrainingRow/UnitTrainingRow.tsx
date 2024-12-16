import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import Button from "components/button/Button";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { addUnit } from "utils/reducers/armyManager";
import { removeHumans } from "utils/reducers/townManager";
import { unitDatabase } from "models/Units";


import "./unitTrainingRow.scss";

interface UnitTrainingRowProps {
  unit: string;
}

export default function UnitTrainingRow({ unit }: UnitTrainingRowProps) {
  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const trainUnit = (quantity: number, unit: string) => {
    const cost = unitDatabase[unit].cost;
    if (townSelector.humans >= quantity * cost) {
      dispatch(removeHumans(quantity * cost));
      dispatch(addUnit({ unit, quantity }));
    }
  };

  return (
    <div className="unit" key={`${unit}-div`}>
      <div className="unit__count">
        <h3 key={`${unit}-title`}>
          {capitalizeFirstLetter(unit)} <br />
        </h3>
        <p className="unit__cost" key={`${unit}-cost`}>
          ({unitDatabase[unit].cost} human
          {unitDatabase[unit].cost > 1 && "s"})
        </p>
        <UnitIcon unit={unit} row />
      </div>
      <div className="unit__buttons">
        <Button
          key={`${unit}-btn1`}
          active={unitDatabase[unit].cost <= townSelector.humans}
          label={`Train 1`}
          onClick={() => trainUnit(1, unit)}
        />
        <Button
          key={`${unit}-btn5`}
          active={unitDatabase[unit].cost * 5 <= townSelector.humans}
          label={`Train 5`}
          onClick={() => trainUnit(5, unit)}
        />
      </div>
    </div>
  );
}
