import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addUnit } from '../../utils/reducers/armyManager'
import { UNIT_TYPES, unitDatabase } from '../../models/Units'
import { removeHumans } from '../../utils/reducers/townManager'
import Button from '../../components/button/Button'

import './academyPannel.scss'


export default function AcademyPannel() {

    const dispatch = useAppDispatch()
    const armySelector = useAppSelector((state) => state.army)
    const townSelector = useAppSelector((state) => state.town)

    const trainUnit = (quantity : number, unit: UNIT_TYPES) => {
        const cost = unitDatabase[unit].cost
        if(townSelector.humans >= (quantity * cost)){
            dispatch(removeHumans(quantity * cost))
            dispatch(addUnit({unit, quantity}))
        }
    }

  return (
    <div className="academy">
        <h1 className="academy__title">Academy</h1>
        <p>We represent an army of <span className='academy__text-red'>{armySelector.totalStrength}</span></p>

        {Object.entries(unitDatabase).map((unit) =>
            <div key={unit[0]+"div"}>
                <h3 key={unit[0]+"title"}>
                    {armySelector.units[unit[0]]} {unit[0]} ({unit[1].cost} human{unit[1].cost > 1 && "s"})
                </h3>
                <Button key={unit[0]+"button1"}
                    active={unit[1].cost <= townSelector.humans} 
                    label={`Train 1 ${unit[0]}`} 
                    onClick={()=>trainUnit(1, unit[0] as UNIT_TYPES)}
                />
                <Button key={unit[0]+"button5"}
                    active={unit[1].cost*5 <= townSelector.humans} 
                    label={`Train 5 ${unit[0]}`} 
                    onClick={()=>trainUnit(5, unit[0] as UNIT_TYPES)}
                />
            </div>
        )}

    </div>
  )
}
