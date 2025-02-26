import UnitIcon from "features/academyPannel/components/unitIcon/UnitIcon";
import "./forgeRow.scss"

interface ForgeRowProps{
    unit: string;
}
export default function ForgeRow({unit}:ForgeRowProps) {
  return (
    <div className="forgeRow">
        <UnitIcon unit={unit} count={false}/>
    </div>
  )
}
