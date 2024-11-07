import { useState } from "react"
import { Berserk, Bower } from "../models/Units.ts"
import { Unit } from "../models/Types.ts"

export interface UnitCount {
    unit: Unit;
    count: number;
}

export const useArmy = () => {
    const [units, setUnits] = useState<{ [key: string]: UnitCount}>({
        berserk: { unit: new Berserk(), count: 0 },
        bower: { unit: new Bower(), count: 0 },
    });

    // Calculates total strength within units object 
    const totalStrength = Object.values(units).reduce(
        (acc, { unit, count }) => acc + unit.strength * count,
        0
    );  

    return { units, setUnits, totalStrength};
  };