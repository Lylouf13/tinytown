import React, { createContext, useState } from 'react'
import { Bower, Berserk } from './Units.ts'
import { enemyForces, generateForces } from './EnemyCamp.js'

export const GameContext = createContext()

export function GameProvider({ children }){

    const [week, setWeek] = useState(0)
    // eslint-disable-next-line
    const [weeklyRate, setWeeklyRate] = useState(10)
    const [humans, setHumans] = useState(0);
    const [units, setUnits] = useState({
        berserk: {unit : new Berserk(), count: 0},
        bower: {unit : new Bower(), count : 0}
    });

    const value = {
        week,
        setWeek,
        weeklyRate,
        setWeeklyRate,
        humans,
        setHumans,
        units,
        setUnits,
        enemyForces,
        generateForces
    }

    return(
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

