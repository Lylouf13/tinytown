import "./buildingResourceExchange.scss";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { spendResources, generateResources } from "utils/reducers/townManager";
import { checkResources } from "utils/resources/checkResources";

import ExchangeTooltip from "components/tooltip/exchangeTooltip/ExchangeTooltip";

interface BuildingResourceExchangeProps {
  name: string;
  resourceSpent: { [key: string]: number };
  resourceGained: { [key: string]: number };
}

export default function BuildingResourceExchange({
  name,
  resourceSpent,
  resourceGained,
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

  if (Object.keys(resourceSpent)[0] === "gold") {
    action = "Buy";
  } else {
    action = "Sell";
  }

  var tooltipId = "";
  if (action==="Buy"){
    tooltipId = `tooltip-Buy-${Object.keys(resourceGained)[0]}`
  }else {
    tooltipId = `tooltip-Sell-${Object.keys(resourceSpent)[0]}`
  }

  console.log(tooltipId)

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
        action={Object.keys(resourceSpent)[0] === "gold" ? "Buy" : "Sell"}
        tooltip={tooltipId}
      />
    </>
  );
}
