import logo from '../logo512.png';
import { useState } from 'react';
import Button from './Button';

export default function Town() {

    const [week, setWeek] = useState(0)
    // eslint-disable-next-line
    const [weeklyRate, setWeeklyRate] = useState(10)
    const [humans, setHumans] = useState(0);
    const [units, setUnits] = useState({
        spearmen:{count: 0, attack: 1},
        bowers:{count: 0, attack: 2}
    });

    // sets next week, and adds weekly rate to the players ressources
    const nextWeek=() => {
        setWeek(week + 1)
        setHumans(humans + weeklyRate)
    }

    // Trains units, used for all unit types, can set the number trained via threshold
    const trainUnit = (threshold, unitType) => {
        console.log(unitType)
        if (humans >= threshold){
            setHumans(humans-threshold)
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
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Week {week}</h1>
            <p>{humans} left to guide</p>
            <Button label={"New Week"} onClick={()=>nextWeek()}/>
            <p>{units.spearmen.count} wearing a spear</p>
            <Button label={"Train 5 Spearmen"} onClick={()=>trainUnit(5, "spearmen")}/>
            <p>{units.bowers.count} wearing a bow</p>
            <Button label={"Train 5 Bowers"} onClick={()=>trainUnit(5, "bowers")}/>
        </div>
    )
}
