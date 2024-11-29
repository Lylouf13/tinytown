type PassiveType = ('pillager' | 'salva' | 'diviner')[]

interface UnitProps{
    name:string
    strength:number
    cost:number
    ranged:boolean
    passives: PassiveType
    description: string
}

export interface UnitCount {
    unit: Unit;
    count: number;
}

export class Unit implements UnitProps{
    name: string;
    strength: number;
    cost: number;
    ranged: boolean;
    passives : PassiveType;
    description: string

    constructor({name, strength, cost, ranged, passives, description}:UnitProps){
        this.name = name
        this.strength = strength
        this.cost = cost
        this.ranged = ranged
        this.passives = passives
        this.description = description
    }

    // Method to add a passive to the unit
    addPassive(newPassive: PassiveType[number]){
        if(!this.passives.includes(newPassive)){
            this.passives.push(newPassive)
        }
    }
}
