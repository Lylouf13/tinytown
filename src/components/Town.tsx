import React from 'react';
import { useContext } from 'react';
import Button from './Button.tsx';
import { GameContext } from '../utils/GameContext.tsx';

export default function Town() {

    const context = useContext(GameContext)
    if(!context){
        throw new Error ("GameContext not found")
    }
    const { 
        humans, 
        setHumans, 
        units, 
        setUnits, 
        totalStrength,
        week, 
        setWeek, 
        enemyForces, 
        generateForces, 
        weeklyRate, 
        // eslint-disable-next-line
        setWeeklyRate,
        fight
    } = context

    // sets next week, and adds weekly rate to the players ressources
    const nextWeek=() => {
        setWeek(week + 1)
        setHumans(humans + weeklyRate)
        generateForces(week+1)
    }

    // Trains units, used for all unit types, can set the number trained via threshold
    const trainUnit = (threshold, unitType) => {
        const datas = units[unitType].unit.getInfos()
        if (humans >= (threshold*datas.cost)){
            setHumans(humans-(threshold*datas.cost))
            setUnits((prevUnits) => ({
                ...prevUnits,
                [unitType]:{
                    ...prevUnits[unitType],
                    count: prevUnits[unitType].count + threshold
                }
            }))
        }
    }
    return (
        <div>        
            <h1>Week {week}</h1>
            <p>{humans} left to guide</p>
            {            
            enemyForces === 0 &&
            <Button label={"Start"} onClick={()=>nextWeek()}/>
            }
            <p>We represent an army of {totalStrength}</p>
            <p>{units.berserk.count} wearing a spear</p>
            <Button label={"Train 1 Spearmen"} onClick={()=>trainUnit(1, "berserk")}/>
            <Button label={"Train 5 Spearmen"} onClick={()=>trainUnit(5, "berserk")}/>
            <p>{units.bower.count} wearing a bow</p>
            <Button label={"Train 1 Bowers"} onClick={()=>trainUnit(1, "bower")}/>
            <Button label={"Train 5 Bowers"} onClick={()=>trainUnit(5, "bower")}/>
            <p>{enemyForces} at our doors</p>
            <Button label={"Fight"} onClick={()=>fight(totalStrength, enemyForces)}/>
        </div>
    )
}
