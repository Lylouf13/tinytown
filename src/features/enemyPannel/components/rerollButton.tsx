import { rerollType } from "utils/reducers/enemyManager"
import { useAppDispatch } from "app/hooks"

import './rerollButton.scss'

export default function RerollButton() {
    const dispatch = useAppDispatch()
  return (
    <button className="reroll" onClick={()=>{dispatch(rerollType())}}>
      <img className="reroll__icon" src="assets/icons/misc/reroll.png" alt="Reroll" />
    </button> 
      
  )
}
