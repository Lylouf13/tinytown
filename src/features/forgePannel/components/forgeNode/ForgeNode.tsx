import "./forgeNode.scss";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useState } from "react";

import { UNIT_UPGRADES } from "enums/UnitUpgrades";
import { unlockUnitUpgrade } from "utils/reducers/armyManager";
import { unitUpgradesDatabase } from "models/UnitUpgrades";
import UpgradeTooltip from "components/tooltip/talentTooltip/UpgradeTooltip";
import { checkResources } from "utils/resources/checkResources";
import { spendResources } from "utils/reducers/townManager";

type ForgeNodeProps = {
  unitUpgrade: UNIT_UPGRADES;
  locked: boolean;
};
export default function ForgeNode({ unitUpgrade, locked }: ForgeNodeProps) {
  const [toSell, setToSell] = useState(true);
  const upgradeData = unitUpgradesDatabase[unitUpgrade];
  const dispatch = useAppDispatch();
  const townSelector = useAppSelector((state) => state.town);
  const onClickHandler = () => {
    if (locked && toSell) {
      if(checkResources(townSelector.resources, upgradeData.cost)) {
        dispatch(unlockUnitUpgrade(unitUpgrade));
        dispatch(spendResources(upgradeData.cost));
        setToSell(false);
      }
    }
  };
  return (
    <>
      <button
        className="forgeUpgrade"
        onClick={onClickHandler}
        data-tooltip-id={`tooltip-${upgradeData.name}`}
      >
        <img
          className={`forgeUpgrade ${toSell ? "forgeUpgrade-toSell" : ""}`}
          src={`assets/icons/unitUpgrades/unitUpgrade-${unitUpgrade}.png`}
          alt={`upgradeArt-${upgradeData}`}
        />
        {!locked && (
          <img
            className="forgeUpgrade__lock"
            src={`assets/icons/misc/locked.png`}
            alt="locked_icon"
          />
        )}
      </button>
      <UpgradeTooltip upgradeData={upgradeData} />
    </>
  );
}
