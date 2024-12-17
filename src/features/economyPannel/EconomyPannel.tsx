import { UNIT_TALENTS } from "enums/UnitTalents";
import TalentTree from "features/talents/talentTree/TalentTree";
import "./economyPannel.scss";

export default function EconomyPannel() {
  return (
    <div className="economy">
      <h2 className="economy__title">Economy</h2>

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

      <TalentTree
        talents={{
          "0": [
            UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,
            UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,
          ],
          "1": [
            UNIT_TALENTS.KING_OF_THE_HILL,
            UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
          ],
          "2": [UNIT_TALENTS.NOT_A_TEST_UPGRADE],
          "3": [UNIT_TALENTS.NOT_A_TEST_UPGRADE],
          "4": [
            UNIT_TALENTS.NOT_A_TEST_UPGRADE,
            UNIT_TALENTS.NOT_A_TEST_UPGRADE,
          ],
        }}
      />
    </div>
  );
}
