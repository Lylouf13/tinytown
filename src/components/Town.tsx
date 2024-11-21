import Button from './button/Button.tsx'
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import { setNextWeek, generateWeeklyHumans } from '../utils/reducers/townManager.tsx'
import { generateEnemy } from '../utils/reducers/enemyManager.tsx'

import AcademyPannel from '../features/academyPannel/AcademyPannel.tsx'
import FightPannel from '../features/fightPannel/FightPannel.tsx'


export default function Town() {


    const dispatch = useAppDispatch()
    const enemySelector = useAppSelector((state) => state.enemy)
    const townSelector = useAppSelector((state) => state.town)

    const nextWeek=() => {
        dispatch(setNextWeek())
        dispatch(generateWeeklyHumans())
        dispatch(generateEnemy(townSelector.week))
    }

   
    return (
        <div>
            <h1>Week {townSelector.week}</h1>
            <p>{townSelector.humans} left to guide</p>     
            <Button active={enemySelector.enemyForces === 0? true : false} label={"Next Week"} onClick={()=>nextWeek()}/>
            <AcademyPannel/>
            <FightPannel/>
        </div>
    )
}
