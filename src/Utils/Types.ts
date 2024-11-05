type PassiveType = ('pillager' | 'salva' | 'diviner' | null)[]

interface UnitProps{
    name:string
    strength:number
    cost:number
    ranged:boolean
    passives: PassiveType
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
    // Method to get unit Datas
    getInfos(){
        return {
            name: this.name,
            strength: this.strength,
            cost: this.cost,
            ranged: this.ranged,
            passives: this.passives
        }
    }   
}
