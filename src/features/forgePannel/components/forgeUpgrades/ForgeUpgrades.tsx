import "./forgeUpgrades.scss";

import { UNIT_UPGRADES } from "enums/UnitUpgrades";

type ForgeUpgradesProps = {
  unitUpgrade: UNIT_UPGRADES;
};
export default function ForgeUpgrades({ unitUpgrade }: ForgeUpgradesProps) {
  return (
      <img className="forgeUpgrade" src={`assets/icons/unitUpgrades/King Of The Hill_icon.png`}/>
  );
}
