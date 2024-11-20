import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppThunk } from '../../app/store.ts'
import Button from '../../components/button/Button.tsx' 
import { clearForces, destroyForces } from '../../utils/reducers/enemyManager.tsx'


export default function FightPannel() {

    const dispatch = useAppDispatch()
    const armySelector = useAppSelector((state) => state.army)
    const enemySelector = useAppSelector((state) => state.enemy)
    

    const salvaPassive = () => dispatch(destroyForces(armySelector.passives.salva))
    
    const pillagerPassive = () => dispatch(destroyForces(armySelector.passives.pillager))
    
    const fight = (): AppThunk => async (dispatch, getState) => {
        try {
            console.log(enemySelector.enemyForces + " Enemies Pre Passives")
            pillagerPassive()
            salvaPassive()

            const state=getState()
            const armyStrength = state.army.totalStrength;
            const enemyForces = state.enemy.enemyForces;
    
            if (armyStrength >= enemyForces) {
                console.log(enemyForces + " Enemies Post Passives")
                dispatch(clearForces())
            } else {
                console.log("no gud")
            }
        } catch (error) {
            console.error("Fight sequence error:", error)
        }
    }

    const handleFight = () => dispatch(fight())
    
    return(
        <div>
            <p>{enemySelector.enemyForces} at our doors</p>
            <Button active={enemySelector.enemyForces > 0 ? true : false}label="fight" onClick={handleFight}/>
        </div>
    )
}