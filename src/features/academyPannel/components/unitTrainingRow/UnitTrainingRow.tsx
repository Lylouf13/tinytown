import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import Button from "components/button/Button";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { addUnit } from "utils/reducers/armyManager";
import { spendResources } from "utils/reducers/townManager";
import { checkResources } from "utils/resources/checkResources";
import { unitDatabase } from "models/Units";
import { RESOURCES } from "enums/Resources";


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

  function multiplyCost(cost: {[keys in RESOURCES]: number}, quantity: number) {
    var newCost = {...cost}
    Object.keys(cost).forEach((key) => {
      newCost[key as keyof typeof newCost] = cost[key as keyof typeof cost] * quantity
    })
    return newCost
  }
  const trainUnit = (quantity: number, unit: string) => {
    const cost = multiplyCost(unitDatabase[unit].cost, quantity)
    if (checkResources(townSelector.resources, cost)) {
        dispatch(spendResources(cost));
        dispatch(addUnit({ unit, quantity }));
    }
  };

  return (
    <div className="unit" key={`${unit}-div`}>
      <div className="unit__count">
        <h3 key={`${unit}-title`}>
          {capitalizeFirstLetter(unit)} <br />
        </h3>

        <UnitIcon unit={unit} row />
      </div>
      <div className="unit__buttons">
        <Button
          key={`${unit}-btn1`}
          active={checkResources(townSelector.resources, unitDatabase[unit].cost)}
          label={`Train 1`}
          onClick={() => trainUnit(1, unit)}
        />
        <Button
          key={`${unit}-btn5`}
          active={checkResources(townSelector.resources, multiplyCost(unitDatabase[unit].cost, 5))}
          label={`Train 5`}
          onClick={() => trainUnit(5, unit)}
        />
      </div>
    </div>
  );
}
