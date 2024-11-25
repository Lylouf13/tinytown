import { useState } from 'react'
import { AppThunk } from '../../app/store.ts'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearEnemy, destroyEnemy } from '../../utils/reducers/enemyManager.tsx'
import { destroyUnits } from '../../utils/reducers/armyManager.tsx'
import { generateResources } from '../../utils/reducers/townManager.tsx'

import Button from '../../components/button/Button.tsx' 
import './fightPannel.scss'


export default function FightPannel() {

    const dispatch = useAppDispatch()
    const armySelector = useAppSelector((state) => state.army)
    const enemySelector = useAppSelector((state) => state.enemy)
    // CHANGE THIS TO USE REDUX -- TEST ONLY
    // Game win / loss state
    var [defeat, setDefeat] = useState(false)
    

    const salvaPassive = () => dispatch(destroyEnemy(armySelector.passives.salva))
    const pillagerPassive = () => dispatch(generateResources({resource: "scavenged", quantity: armySelector.passives.pillager}))
    
    const generateFightResources = (quantity: number) => dispatch(generateResources({resource: "gold", quantity: quantity}))

    const fight = (): AppThunk => async (dispatch, getState) => {
        try {
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

            pillagerPassive()
            generateFightResources(enemySelector.enemyForces)

            } catch (error) {
                console.error("Fight sequence error:", error)
        }
    }

    const handleFight = () => dispatch(fight())
    
    return(
        <div className='fight'>
            <p>{enemySelector.enemyForces} at our doors</p>
            {defeat && <p>they took our town</p>}
            <Button active={enemySelector.enemyForces > 0 ? true : false}label="fight" onClick={handleFight}/>
        </div>
    )
}