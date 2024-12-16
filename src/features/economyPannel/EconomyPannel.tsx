import { UNIT_TALENTS } from "enums/UnitTalents";
import TalentTree from "features/talents/talentTree/TalentTree";
import "./economyPannel.scss";

export default function EconomyPannel() {
  return (
    <div className="economy">
      <h2 className="economy__title">Economy</h2>

      <TalentTree
        talents={[
          UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,
          UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
          UNIT_TALENTS.NOT_A_TEST_UPGRADE,
          UNIT_TALENTS.KING_OF_THE_HILL,
        ]}
        talentPerRow={[1,2,1]}
      />
            <TalentTree
        talents={[
          UNIT_TALENTS.RAGE_OF_THE_ANCIENTS,
          UNIT_TALENTS.KING_OF_THE_HILL,
          UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2,
          UNIT_TALENTS.KING_OF_THE_HILL,
          UNIT_TALENTS.NOT_A_TEST_UPGRADE,
          UNIT_TALENTS.KING_OF_THE_HILL,
        ]}
        talentPerRow={[1,2,2,1]}
        />
    </div>
  );
}
