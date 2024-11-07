import React, { createContext, useState, ReactNode } from 'react'
import { UnitCount } from './ArmyManager.ts'

import { useEnemyCamp } from './EnemyCamp.ts'
import { useArmy } from './ArmyManager.ts'
import { fight } from './FightManager.ts'



interface GameContextType {
    week: number;
    setWeek: React.Dispatch<React.SetStateAction<number>>;
    weeklyRate: number;
    setWeeklyRate: React.Dispatch<React.SetStateAction<number>>;
    humans: number;
    setHumans: React.Dispatch<React.SetStateAction<number>>;
    units: {
        [key: string]: UnitCount;
    };
    setUnits: React.Dispatch<React.SetStateAction<{ [key: string]: UnitCount }>>;
    enemyForces: number;
    generateForces: Function;
    fight: Function
    totalStrength: number
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
    const [week, setWeek] = useState<number>(0);
    // eslint-disable-next-line
    const [weeklyRate, setWeeklyRate] = useState<number>(10);
    const [humans, setHumans] = useState<number>(0);

    const { enemyForces, generateForces } = useEnemyCamp()
    const { units, setUnits, totalStrength } = useArmy()
    const value: GameContextType = {
        week,
        setWeek,
        weeklyRate,
        setWeeklyRate,
        humans,
        setHumans,
        units,
        setUnits,
        totalStrength,
        enemyForces,
        generateForces,
        fight
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}