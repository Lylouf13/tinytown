import { UNIT_PASSIVES } from "enums/UnitPassives.ts";
import { UNIT_TYPES } from "enums/UnitTypes";
import { RESOURCES } from "enums/Resources";

interface UnitProps {
  name: string;
  strength: number;
  defense: number;
  cost: { [key in RESOURCES]: number };
  ranged: boolean;
  passives: UNIT_PASSIVES[];
  description: string;
}

export class Unit implements UnitProps {
  name: string;
  strength: number;
  defense: number;
  cost: { [key in RESOURCES]: number };
  ranged: boolean;
  passives: UNIT_PASSIVES[];
  description: string;

  constructor({
    name,
    strength,
    defense,
    cost,
    ranged,
    passives,
    description,
  }: UnitProps) {
    this.name = name;
    this.strength = strength;
    this.defense = defense;
    this.cost = cost;
    this.ranged = ranged;
    this.passives = passives;
    this.description = description;
  }

  // Method to add a passive to the unit
  addPassive(newPassive: UNIT_PASSIVES) {
    if (!this.passives.includes(newPassive)) {
      this.passives.push(newPassive);
    }
  }
}

export class Berserk extends Unit {
  constructor() {
    super({
      name: "Berserk",
      strength: 1,
      defense: 1,
      cost: {
        [RESOURCES.HUMANS]: 1,
        [RESOURCES.GOLD]: 0,
        [RESOURCES.SCAVENGED]: 0,
        [RESOURCES.SOULS]: 0,
      },
      ranged: false,
      passives: [UNIT_PASSIVES.PILLAGER],
      description: `A cheap unit that uses anything he can find as a weapon to protect the town.
            Can find resources to salvage during fights`,
    });
  }
}

export class Bower extends Unit {
  constructor() {
    super({
      name: "Bower",
      strength: 2,
      defense: 1,
      cost: {
        [RESOURCES.HUMANS]: 1,
        [RESOURCES.GOLD]: 2,
        [RESOURCES.SCAVENGED]: 0,
        [RESOURCES.SOULS]: 0,
      },
      ranged: true,
      passives: [UNIT_PASSIVES.SALVA],
      description: `A potent but fragile unit, uses a bow to pick down enemies before they can attack.
            Works well with a frontlane protecting them`,
    });
  }
}

export class Guardian extends Unit {
  constructor() {
    super({
      name: "Guardian",
      strength: 1,
      defense: 8,
      cost: {
        [RESOURCES.HUMANS]: 1,
        [RESOURCES.GOLD]: 2,
        [RESOURCES.SCAVENGED]: 5,
        [RESOURCES.SOULS]: 0,
      },
      ranged: false,
      passives: [UNIT_PASSIVES.PILLAGER, UNIT_PASSIVES.PROTECTOR],
      description: `A strong and expensive unit, protects the others from the ennemies assault, adding
            durability to your army`,
    });
  }
}

export const unitDatabase: { [key: string]: Unit } = {
  [UNIT_TYPES.BERSERK]: new Berserk(),

  [UNIT_TYPES.BOWER]: new Bower(),

  [UNIT_TYPES.GUARDIAN]: new Guardian(),
};


