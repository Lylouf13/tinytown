import "./talentNode.scss";

import { UNIT_TALENTS, unitTalentsDatabase } from "models/UnitTalents";
import { unlockUnitUpgrade } from "utils/reducers/townManager";
import { updateStats } from "utils/reducers/armyManager";
import { useAppDispatch } from "app/hooks";

type TalentNodeProps = {
  talent: UNIT_TALENTS;
};

export default function TalentNode({ talent }: TalentNodeProps) {
  const dispatch = useAppDispatch();

  const checkRequirements = () => {
    if (unitTalentsDatabase[talent].requirements.length === 0) {
      return true;
    } else {
      for (const requirement of unitTalentsDatabase[talent].requirements) {
        if (!unitTalentsDatabase[requirement].unlocked) {
          return false;
        }
      }
      return true;
    }
  };

  const handleClick = () => {
    if (checkRequirements()) {
      dispatch(unlockUnitUpgrade(talent));
      dispatch(updateStats());
    }
  };

  const stateHandler = () => {
    var state = "talentNode";
    if (unitTalentsDatabase[talent].unlocked) {
      state += " talentNode-unlocked";
    } else if (!checkRequirements()) {
      state += " talentNode-locked";
    }
    return state;
  };

  return (
    <button onClick={handleClick} className={stateHandler()}>
      {talent}
    </button>
  );
}