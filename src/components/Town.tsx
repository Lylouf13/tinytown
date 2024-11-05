import React from 'react';
import logo from '../logo512.png';
import { useContext } from 'react';
import Button from './Button.tsx';
import { GameContext } from '../utils/GameContext';

export default function Town() {

    const { humans, setHumans, units, setUnits, week, setWeek, weeklyRate, enemyForces, generateForces } = useContext(GameContext)
    // sets next week, and adds weekly rate to the players ressources
    const nextWeek=() => {
        setWeek(week + 1)
        setHumans(humans + weeklyRate)
    }

    // Trains units, used for all unit types, can set the number trained via threshold
    const trainUnit = (threshold, unitType) => {
        const datas = units[unitType].unit.getInfos()
        console.log(units[unitType].unit.getInfos())
        if (humans >= (threshold*datas.cost)){
            setHumans(humans-(threshold*datas.cost))
            setUnits((prevUnits) => ({
                ...prevUnits,
                [unitType]:{
                    ...prevUnits[unitType],
                    count: prevUnits[unitType].count + threshold
                }
            }))
            console.log("trained "+ threshold +datas.name)
        }
    }

    return (
        <div>        
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Week {week}</h1>
            <p>{humans} left to guide</p>
            <Button label={"New Week"} onClick={()=>nextWeek()}/>
            <p>{units.berserk.count} wearing a spear</p>
            <Button label={"Train 1 Spearmen"} onClick={()=>trainUnit(1, "berserk")}/>
            <Button label={"Train 5 Spearmen"} onClick={()=>trainUnit(5, "berserk")}/>
            <p>{units.bower.count} wearing a bow</p>
            <Button label={"Train 1 Bowers"} onClick={()=>trainUnit(1, "bower")}/>
            <Button label={"Train 5 Bowers"} onClick={()=>trainUnit(5, "bower")}/>
            <p>{enemyForces} at our doors</p>
            <Button label={"Gen 10 more"} onClick={()=>{generateForces(); console.log(enemyForces)}}/>

        </div>
    )
}
