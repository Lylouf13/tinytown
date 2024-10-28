import logo from '../logo512.png';
import { useContext } from 'react';
import Button from './Button';
import { GameContext } from '../Utils/GameContext';

export default function Town() {

    const { humans, setHumans, units, setUnits, week, setWeek, weeklyRate } = useContext(GameContext)

    // sets next week, and adds weekly rate to the players ressources
    const nextWeek=() => {
        setWeek(week + 1)
        setHumans(humans + weeklyRate)
    }

    // Trains units, used for all unit types, can set the number trained via threshold
    const trainUnit = (threshold, unitType, cost) => {
        console.log(unitType)
        if (humans >= (threshold*cost)){
            setHumans(humans-(threshold*cost))
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
            <p>{units.berserk.count} wearing a spear</p>
            <Button label={"Train 1 Spearmen"} onClick={()=>trainUnit(1, "berserk",1)}/>
            <Button label={"Train 5 Spearmen"} onClick={()=>trainUnit(5, "berserk",1)}/>
            <p>{units.bower.count} wearing a bow</p>
            <Button label={"Train 1 Bowers"} onClick={()=>trainUnit(1, "bower", 2)}/>
            <Button label={"Train 5 Bowers"} onClick={()=>trainUnit(5, "bower", 2)}/>
        </div>
    )
}
