type PassiveType = ('pillager' | 'salva' | 'diviner')[]

interface UnitProps{
    name:string
    strength:number
    cost:number
    ranged:boolean
    passives: PassiveType
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
    passives : PassiveType

    constructor({name, strength, cost, ranged, passives}:UnitProps){
        this.name = name
        this.strength = strength
        this.cost = cost
        this.ranged = ranged
        this.passives = passives
    }

    // Method to add a passive to the unit
    addPassive(newPassive: PassiveType[number]){
        if(!this.passives.includes(newPassive)){
            this.passives.push(newPassive)
        }
    }
}
