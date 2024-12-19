import { useState } from "react";
import TalentTree from "features/talents/talentTree/TalentTree";
import { UNIT_TALENTS } from "enums/UnitTalents";
import { UNIT_TYPES } from "enums/UnitTypes";

import "./talentPannel.scss";

export default function TalentPannel() {
  const [currentUnit, setCurrentUnit] = useState(UNIT_TYPES.BOWER);
  return (
    <div className="talentPannel">
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
            <img src={`/assets/icons/units/${unit}_icon.png`} />
          </button>
        ))}
      </div>
      {currentUnit === UNIT_TYPES.BERSERK && (
        <>
          <h3> Berserk </h3>
          <TalentTree
            talents={{
              "0": [UNIT_TALENTS.RAGE_OF_THE_ANCIENTS],
              "1": [
                UNIT_TALENTS.KING_OF_THE_HILL,
                UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
              ],
              "2": [UNIT_TALENTS.NOT_A_TEST_UPGRADE],
            }}
          />
        </>
      )}
      {currentUnit === UNIT_TYPES.BOWER && (
        <>
          <h3> Bower </h3>
          <TalentTree
            talents={{
              "0": [UNIT_TALENTS.BOWER_1],
              "1": [UNIT_TALENTS.BOWER_2, UNIT_TALENTS.BOWER_3],
              "2": [UNIT_TALENTS.BOWER_4],
              "3": [UNIT_TALENTS.BOWER_5],
            }}
          />
        </>
      )}
      {currentUnit === UNIT_TYPES.GUARDIAN && (
        <>
          <h3> Guardian </h3>
          <TalentTree
            talents={{
              "0": [UNIT_TALENTS.GUARDIAN_1],
              "1": [UNIT_TALENTS.GUARDIAN_2],
              "2": [UNIT_TALENTS.GUARDIAN_3, UNIT_TALENTS.GUARDIAN_4],
              "3": [UNIT_TALENTS.GUARDIAN_5],
            }}
          />
        </>
      )}
    </div>
  );
}
