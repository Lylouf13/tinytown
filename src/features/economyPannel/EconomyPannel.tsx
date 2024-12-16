import { UNIT_TALENTS } from "enums/UnitTalents";
import TalentNode from "features/talents/talentNode/TalentNode";
import './economyPannel.scss'

export default function EconomyPannel() {

    
  return (
    <div className='economy'>
        <h2 className='economy__title'>Economy</h2>

        <TalentNode talent={UNIT_TALENTS.RAGE_OF_THE_ANCIENTS} />
        <TalentNode talent={UNIT_TALENTS.RAGE_OF_THE_ANCIENTS_2} />
        <TalentNode talent={UNIT_TALENTS.NOT_A_TEST_UPGRADE} />
        <TalentNode talent={UNIT_TALENTS.KING_OF_THE_HILL} />
    </div>
  )
}