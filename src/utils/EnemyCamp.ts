import { useState } from "react"


export const useEnemyCamp = () => {
    const [enemyForces, setEnemyForces] = useState<number>(0);
    function generateForces(week:number){
        setEnemyForces(week * 5);
    }
    return { enemyForces, generateForces };
  };