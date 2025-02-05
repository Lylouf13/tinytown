import { Tooltip } from "react-tooltip";
import { EnemyArmies, enemyArmiesDatabase } from "models/EnemyArmies";
import { ENEMY_ARMIES } from "enums/EnemyArmies";
import "../customTooltip.scss";

interface enemyArmyTooltipProps {
  army: ENEMY_ARMIES;
}

export default function EnemyArmyTooltip({ army }: enemyArmyTooltipProps) {

  const armyData = enemyArmiesDatabase[army];
  return (
    <Tooltip
      disableStyleInjection
      className="tooltip"
      id={`tooltip-${army.toLowerCase()}`}
      place="bottom"
      opacity={0.99}
    >
      <h3 className="tooltip__title">{armyData.name}</h3>
      <p className="tooltip__text">{armyData.description}</p>
      <p className={`tooltip__text-${army.toLowerCase()}`}>{armyData.effect}</p>
    </Tooltip>
  );
}
