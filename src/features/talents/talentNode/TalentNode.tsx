import './talentNode.scss'

import { UNIT_UPGRADES } from 'models/Units';
import { unlockUnitUpgrade } from 'utils/reducers/townManager';
import { updateStats } from 'utils/reducers/armyManager';
import { useAppDispatch } from "app/hooks";

type TalentNodeProps = {
  talent: UNIT_UPGRADES
}

export default function TalentNode({talent}: TalentNodeProps) {
    
    const dispatch = useAppDispatch();
   
    const handleClick = () => {
        dispatch(unlockUnitUpgrade(talent));
        dispatch(updateStats());
    }
  return (
    <button onClick={handleClick} className="talentNode">{talent}</button>
  )
}
