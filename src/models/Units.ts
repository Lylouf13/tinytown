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
            passives: ['salva', 'diviner']
        });
    }
}