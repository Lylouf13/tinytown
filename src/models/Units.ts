import {Unit} from './Types.ts'
  
export class Berserk extends Unit{
    constructor() {
        super({ 
            name: "Berserk", 
            strength: 1, 
            cost: 1 , 
            ranged: false, 
            passives: ['pillager']
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
            passives: ['salva']
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
  