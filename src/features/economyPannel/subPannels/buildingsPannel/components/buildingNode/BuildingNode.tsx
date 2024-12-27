import "./buildingNode.scss"

import { TOWN_BUILDINGS } from "enums/TownBuildings"
import { townBuildingDatabase } from "models/TownBuildings"

interface BuildingNodeProps {
    building : TOWN_BUILDINGS
}

export default function BuildingNode({building}: BuildingNodeProps) {
  return (
    <button className="buildingNode">
        <img className="buildingNode__icon" src={`assets/icons/buildings/${building}.png`} alt={`${building}-icon`}/>
    </button>
  )
}
