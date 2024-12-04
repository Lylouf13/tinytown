import { useAppDispatch, useAppSelector } from 'app/hooks';

import './fightPannel.scss'

export default function FightPannel() {

  const dispatch = useAppDispatch();
  const armySelector = useAppSelector((state) => state.army);
  const enemySelector = useAppSelector((state) => state.enemy);
  return (
    <div className="fight">
      <h2>Fight</h2>
      <div className='fight__overview'>
        <p>{armySelector.totalStrength}</p>
        <p>{enemySelector.enemyForces}</p>
      </div>
      <img className="fight__art" src="" alt="placeholder"/>
    </div>
  )
}
