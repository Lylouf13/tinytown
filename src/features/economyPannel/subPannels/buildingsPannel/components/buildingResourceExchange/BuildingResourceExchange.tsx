import "./buildingResourceExchange.scss";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { spendResources, generateResources } from "utils/reducers/townManager";
import { checkResources } from "utils/resources/checkResources";
import { RESOURCES } from "enums/Resources";

import ExchangeTooltip from "components/tooltip/exchangeTooltip/ExchangeTooltip";

interface BuildingResourceExchangeProps {
  name: string;
  resourceSpent: { [key: string]: number };
  resourceGained: { [key: string]: number };
  location: string
}

export default function BuildingResourceExchange({
  name,
  resourceSpent,
  resourceGained,
  location
}: BuildingResourceExchangeProps) {
  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);

  const exchange = () => {
    if (
      checkResources(townSelector.resources, resourceSpent)
    ) {
      dispatch(spendResources(resourceSpent));
      dispatch(generateResources(resourceGained));
    }
  };

  var action = "";

  if (Object.keys(resourceSpent)[0] === RESOURCES.GOLD) {
    action = "Buy";
  } else {
    action = "Sell";
  }

  var tooltipId = "";
  if (action==="Buy"){
    tooltipId = `tooltip-Buy-${Object.keys(resourceGained)[0]} ${location}`
  }else {
    tooltipId = `tooltip-Sell-${Object.keys(resourceSpent)[0]} ${location}`
  }


  return (
    <>
    <button className="buildingResourceExchange">
      <img
        onClick={exchange}
        className="buildingResourceExchange__icon"
        src={`assets/icons/actions/market/${name}.png`}
        alt={`buildingAction-`}
        data-tooltip-id={tooltipId}
      />
    </button>
      <ExchangeTooltip
        spent={resourceSpent}
        gained={resourceGained}
        action={Object.keys(resourceSpent)[0] === RESOURCES.GOLD ? "Buy" : "Sell"}
        tooltip={tooltipId}
      />
    </>
  );
}
