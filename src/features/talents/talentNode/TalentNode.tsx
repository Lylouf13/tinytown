import "./talentNode.scss";

import { UNIT_TALENTS } from "enums/UnitTalents";
import { unitTalentsDatabase } from "models/UnitTalents";
import { unlockUnitUpgrade } from "utils/reducers/townManager";
import { updateStats } from "utils/reducers/armyManager";
import { useAppDispatch } from "app/hooks";

import TalentTooltip from "components/tooltip/talentTooltip/TalentTooltip";

interface TalentNodeProps {
  talent: UNIT_TALENTS;
};

export default function TalentNode({ talent }: TalentNodeProps) {
  const dispatch = useAppDispatch();
  const talentData = unitTalentsDatabase[talent];

  const checkRequirements = () => {
    if (talentData.requirements.length === 0) {
      return true;
    } else {
      for (const requirement of talentData.requirements) {
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
    if (talentData.unlocked) {
      state += " talentNode-unlocked";
    } else if (!checkRequirements()) {
      state += " talentNode-locked";
    }
    return state;
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={stateHandler()}
        data-tooltip-id={`tooltip-${talent}`}
      >
        <img
          className="talentNode__icon"
          src={`/assets/icons/talents/${talent}_icon.png`}
          alt={`${talent}-icon`}
        />
        {!checkRequirements() && <img className="talentNode__lock" src="/assets/icons/misc/locked.png" alt="lock" />}
      </button>
      <TalentTooltip
        title={talentData.name}
        description={talentData.description}
        cost={talentData.cost}
        required={!checkRequirements() ? talentData.requirements : []}
      />
    </>
  );
}
