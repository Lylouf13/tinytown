import {Unit} from './Types.ts'
  
export class Berserk extends Unit{
    constructor() {
        super({ 
            name: "Berserk", 
            strength: 1, 
            cost: 1 , 
            ranged: false, 
            passives: ['pillager'],
            description: "A cheap unit that can find resources to salvage during fights"
        });
    }
}

export class Bower extends Unit{
    constructor() {
        super({ 
            name: "Bower", 
            strength: 2, 
            cost: 2 , 
            ranged: true, 
            passives: ['salva'],
            description: "A potent but fragile unit, can pick down enemies before they can attack"
        });
    }
}

// Define unit types as string constants
export enum UNIT_TYPES  {
    BERSERK= 'berserk',
    BOWER= 'bower'
}
  
export const unitDatabase: { [key: string]: Unit } = {
    [UNIT_TYPES.BERSERK]: new Berserk(),
  
    [UNIT_TYPES.BOWER]: new Bower()
}
  
export enum UNIT_PASSIVES{
    PILLAGER= 'pillager',
    SALVA= 'salva',
    DIVINER= 'diviner'  
}
  