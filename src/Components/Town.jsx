import logo from '../logo512.png';
import { useState } from 'react';
import Button from './Button';

export default function Town() {

    const [week, setWeek] = useState(0)
    // eslint-disable-next-line
    const [weeklyRate, setWeeklyRate] = useState(10)
    const [humans, setHumans] = useState(0);
    const [spearmen, setSpearmen] = useState(0);
    const [bowers, setBowers] = useState(0);

    // sets next week, and adds weekly rate to the players ressources
    const nextWeek=() => {
        setWeek(week+1)
        setHumans(humans+weeklyRate)
    }

    // Trains units, used for all unit types, can set the number trained via threshold
    const trainUnit = (threshold, unit) => {
        if (humans >= threshold){
            setHumans(humans-threshold)
            switch(unit){
                case "spearmen":
                    setSpearmen(spearmen+threshold)
                    break;
                case "bowers":
                    setBowers(bowers+threshold)
                    break;
                default:
                    console.log("something wrong happened and i dont know why")
            }
        }
    }

    return (
        <div>        
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Week {week}</h1>
            <p>{humans} left to guide</p>
            <Button label={"New Week"} function={()=>nextWeek()}/>
            <p>{spearmen} wearing a spear</p>
            <Button label={"Train 5 Spearmen"} function={()=>trainUnit(5, "spearmen")}/>
            <p>{bowers} wearing a bow</p>
            <Button label={"Train 5 Bowers"} function={()=>trainUnit(5, "bowers")}/>
        </div>
    )
}
