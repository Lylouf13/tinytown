import { useState } from "react";
import TalentTree from "features/talents/talentTree/TalentTree";
import { UNIT_TALENTS } from "enums/UnitTalents";
import { UNIT_TYPES } from "enums/UnitTypes";

import "./talentPannel.scss";

interface TalentPannelProps {
  active? : boolean
};
export default function TalentPannel({active = true}: TalentPannelProps) {
  const [currentUnit, setCurrentUnit] = useState(UNIT_TYPES.BOWER);
  return (
    <div className={`talentPannel${active ? "" : "-hidden"}`}>
      <div className="talentPannel__buttonContainer">
        {Object.keys(UNIT_TYPES).map((unit) => (
          <button
            className={`talentPannel__button ${
              currentUnit === UNIT_TYPES[unit as keyof typeof UNIT_TYPES] &&
              "talentPannel__button-active"
            }`}
            key={`unit-${unit}`}
            onClick={() =>
              setCurrentUnit(UNIT_TYPES[unit as keyof typeof UNIT_TYPES])
            }
          >
            <img src={`/assets/icons/units/${unit.toLowerCase()}_icon.png`} alt={`${unit}_icon`}/>
          </button>
        ))}
      </div>
          <TalentTree
            title="Berserk"
            active={currentUnit === UNIT_TYPES.BERSERK}
            talents={{
              "0": [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS],
              "1": [
                UNIT_TALENTS.KING_OF_THE_HILL,
                UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
              ],
              "2": [UNIT_TALENTS.NOT_A_TEST_UPGRADE],
            }}
          />

          <TalentTree
            title="Bower"
            active={currentUnit === UNIT_TYPES.BOWER}
            talents={{
              "0": [UNIT_TALENTS.BOWER_1],
              "1": [UNIT_TALENTS.BOWER_2, UNIT_TALENTS.BOWER_3],
              "2": [UNIT_TALENTS.BOWER_4],
              "3": [UNIT_TALENTS.BOWER_5],
            }}
          />

          <TalentTree
            title="Guardian"
            active={currentUnit === UNIT_TYPES.GUARDIAN}
            talents={{
              "0": [UNIT_TALENTS.GUARDIAN_1],
              "1": [UNIT_TALENTS.GUARDIAN_2],
              "2": [UNIT_TALENTS.GUARDIAN_3, UNIT_TALENTS.GUARDIAN_4],
              "3": [UNIT_TALENTS.GUARDIAN_5],
            }}
          />

    </div>
  );
}
