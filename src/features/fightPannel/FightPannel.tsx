import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppThunk } from '../../app/store.ts'
import Button from '../../components/button/Button.tsx' 
import { clearEnemy, destroyEnemy } from '../../utils/reducers/enemyManager.tsx'
import { destroyUnits } from '../../utils/reducers/armyManager.tsx'
import { useState } from 'react'


export default function FightPannel() {

    const dispatch = useAppDispatch()
    const armySelector = useAppSelector((state) => state.army)
    const enemySelector = useAppSelector((state) => state.enemy)
    // CHANGE THIS TO USE REDUX -- TEST ONLY
    var [defeat, setDefeat] = useState(false)
    

    const salvaPassive = () => dispatch(destroyEnemy(armySelector.passives.salva))
    
    // eslint-disable-next-line 
    const pillagerPassive = () => dispatch(destroyEnemy(armySelector.passives.pillager))
    
    const fight = (): AppThunk => async (dispatch, getState) => {
        try {
            //pillagerPassive()
            salvaPassive()

            const state=getState()
            const armyStrength = state.army.totalStrength;
            const remainingEnemyForces = state.enemy.enemyForces;
    
            if (armyStrength >= remainingEnemyForces) {
                dispatch(destroyUnits(remainingEnemyForces))
                dispatch(clearEnemy())
            } else {
                console.log("no gud")
                setDefeat(true)
            }
        } catch (error) {
            console.error("Fight sequence error:", error)
        }
    }

    const handleFight = () => dispatch(fight())
    
    return(
        <div>
            <p>{enemySelector.enemyForces} at our doors</p>
            {defeat && <p>they took our town</p>}
            <Button active={enemySelector.enemyForces > 0 ? true : false}label="fight" onClick={handleFight}/>
        </div>
    )
}