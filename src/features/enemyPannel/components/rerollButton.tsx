import { rerollType } from "utils/reducers/enemyManager"
import { useAppDispatch } from "app/hooks"
import Button from "components/button/Button"

export default function RerollButton() {
    const dispatch = useAppDispatch()
    const clickHandler = () => dispatch(rerollType())
  return (
    <Button label="reroll" onClick={()=>{dispatch(rerollType())}} />
  )
}
