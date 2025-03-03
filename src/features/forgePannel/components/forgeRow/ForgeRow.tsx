import "./forgeRow.scss";

import React from "react";
import { UNIT_UPGRADES } from "enums/UnitUpgrades";
import { UNIT_TYPES } from "enums/UnitTypes";
import { unitDatabase } from "models/Units";

import ForgeUpgrades from "../forgeUpgrades/ForgeUpgrades";

interface ForgeRowProps {
  unit: string;
}
export default function ForgeRow({ unit }: ForgeRowProps) {
  const unitData = unitDatabase[unit];

  var unitUpgrades: UNIT_UPGRADES[] = [];
  if (unit === UNIT_TYPES.BERSERK) {
    unitUpgrades = [
      UNIT_UPGRADES.BERSERK_1,
      UNIT_UPGRADES.BERSERK_2,
      UNIT_UPGRADES.BERSERK_3,
      UNIT_UPGRADES.BERSERK_4,
      UNIT_UPGRADES.BERSERK_5,
    ];
  } else if (unit === UNIT_TYPES.BOWER) {
    unitUpgrades = [
      UNIT_UPGRADES.BOWER_1,
      UNIT_UPGRADES.BOWER_2,
      UNIT_UPGRADES.BOWER_3,
      UNIT_UPGRADES.BOWER_4,
      UNIT_UPGRADES.BOWER_5,
    ];
  } else if (unit === UNIT_TYPES.GUARDIAN) {
    unitUpgrades = [
      UNIT_UPGRADES.GUARDIAN_1,
      UNIT_UPGRADES.GUARDIAN_2,
      UNIT_UPGRADES.GUARDIAN_3,
      UNIT_UPGRADES.GUARDIAN_4,
      UNIT_UPGRADES.GUARDIAN_5,
    ];
  }
  return (
    <div className="forgeRow">
      <div className="forgeRow__unit">
        <h3>{unitData.name}</h3>
        <div className="forgeRow__stat">
          <div className="forgeRow__stat">
            <img
              className="forgeRow__stat__icon"
              src={`assets/icons/misc/${
                unitData.ranged ? "range" : "melee"
              }StrengthIcon.png`}
              alt="unitStrength"
            />
            <span className="forgeRow__stat-strength">{unitData.strength} </span>
          </div>
          <div className="forgeRow__stat">
            <img
              className="forgeRow__stat__icon"
              src={`assets/icons/misc/defenseIcon.png`}
              alt="unitStrength"
            />
            <span className="forgeRow__stat-defense">{unitData.defense} </span>
          </div>
        </div>
      </div>
      <div className="forgeRow__upgrades">
        {unitUpgrades.map((unitUpgrade: UNIT_UPGRADES, index) => (
          <React.Fragment key={unitUpgrade}>
            <ForgeUpgrades unitUpgrade={unitUpgrade} key={unitUpgrade} />
            {index < 4 && (
              <span className="forgeRow__link" key={`${unitUpgrade}-link`}></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
