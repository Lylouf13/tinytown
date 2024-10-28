//#region base Classes
class Unit{
    constructor(name, strength){
        this.name = name
        this.strength = strength
    }
}

class Melee extends Unit{
    constructor(name, strength){
        super(name, strength)
        this.ranged = false
    }
}
// eslint-disable-next-line
class Ranged extends Unit{
    constructor(name, strength){
        super(name, strength)
        this.ranged = true
    }
}
//#endregion

//#region Melee Units
export class Berserk extends Melee{
    constructor(){
        super("Berserk",1)
        this.pillager = true
    }
}

//#endregion

//#region Ranged Units
export class Bower extends Ranged{
    constructor(){
        super("Bower",2)
    }
}
//#endregion