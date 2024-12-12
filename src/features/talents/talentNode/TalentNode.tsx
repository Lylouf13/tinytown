import "./talentNode.scss";

import { UNIT_UPGRADES, unitUpgradesDatabase } from "models/Units";
import { unlockUnitUpgrade } from "utils/reducers/townManager";
import { updateStats } from "utils/reducers/armyManager";
import { useAppDispatch } from "app/hooks";

type TalentNodeProps = {
  talent: UNIT_UPGRADES;
};

export default function TalentNode({ talent }: TalentNodeProps) {
  const dispatch = useAppDispatch();

  const checkRequirements = () => {
    if (unitUpgradesDatabase[talent].requirements.length === 0) {
      return true;
    } else{
      for (const requirement of unitUpgradesDatabase[talent].requirements) {
        if (!unitUpgradesDatabase[requirement].unlocked) {
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
  return (
    <button onClick={handleClick} className="talentNode">
      {talent}
    </button>
  );
}
