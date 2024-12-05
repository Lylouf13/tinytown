import {Unit} from './Types.ts'
  
export class Berserk extends Unit{
    constructor() {
        super({ 
            name: "Berserk", 
            strength: 1,
            defense: 1,
            cost: 1 , 
            ranged: false, 
            passives: ['pillager'],
            description: `A cheap unit that uses anything he can find as a weapon to protect the town.
            Can find resources to salvage during fights`
        });
    }
}

export class Bower extends Unit{
    constructor() {
        super({ 
            name: "Bower", 
            strength: 2, 
            defense: 1,
            cost: 2 , 
            ranged: true, 
            passives: ['salva'],
            description: `A potent but fragile unit, uses a bow to pick down enemies before they can attack.
            Works well with a frontlane protecting them`
        });
    }
}

export class Guardian extends Unit{
    constructor() {
        super({ 
            name: "Guardian", 
            strength: 1, 
            defense: 5,
            cost: 3, 
            ranged: true, 
            passives: ['protector', 'pillager'],
            description: `A strong and expensive unit, protects the others from the ennemies assault, adding
            durability to your army`
        });
    }
}

// Define unit types as string constants
export enum UNIT_TYPES  {
    BERSERK= 'berserk',
    BOWER= 'bower',
    GUARDIAN = 'guardian'
}
  
export const unitDatabase: { [key: string]: Unit } = {
    [UNIT_TYPES.BERSERK]: new Berserk(),
  
    [UNIT_TYPES.BOWER]: new Bower(),

    [UNIT_TYPES.GUARDIAN]: new Guardian()
}
  
export enum UNIT_PASSIVES{
    PILLAGER= 'pillager',
    SALVA= 'salva',
    PROTECTOR='protector',
    DIVINER= 'diviner'  
}
  