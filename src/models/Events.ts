import { EVENTS } from "enums/Events";
import { RESOURCES } from "enums/Resources";
import { UNIT_TYPES } from "enums/UnitTypes";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { SliceAction } from "models/Slices";
import { WEEK_TYPES } from "enums/WeekTypes";
import { randomInt } from "utils/resources/random";
import { SEEKER } from "enums/Seeker";

export enum EVENT_TYPES {
  EVENT = "Event",
  CHOICE = "Choice",
  SHOP = "Shop",
}

export type ShopAction = {
  action: string;
  resourceSpent: { [key: string]: number };
  resourceGained: { [key: string]: number };
};

type EventEffects =
  | {
      // Casualty
      type: EVENT_TYPES.EVENT;
      effect: SliceAction[];
    }
  | {
      // Choice
      type: EVENT_TYPES.CHOICE;
      choiceOneDescription: string;
      choiceTwoDescription: string;
      choiceOne: SliceAction[];
      choiceTwo: SliceAction[];
    }
  | {
      // Shop
      type: EVENT_TYPES.SHOP;
      shops: ShopAction[];
    };

export interface Event {
  name: string;
  description: string;
  eventEffect: EventEffects;
}

export const eventDatabase: { [key in EVENTS]: Event } = {
  [EVENTS.NONE]: {
    name: "None",
    description:
      "This should not happen tbh. The game probably broke to end up here, anyway get a free farm ig",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "town",
          actionName: "createBuilding",
          payload: TOWN_BUILDINGS.FARM,
        },
      ],
    },
  },

  // ECONOMY
  [EVENTS.ENTHUSIASTIC_MASONRY]: {
    name: "Enthusiastic Masonry",
    description:
      "Masons are working their life for this town, reasonable or not, it's a good thing for our resources.",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Build a free Farm",
      choiceTwoDescription: "Build a free Mine",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "createBuilding",
          payload: TOWN_BUILDINGS.FARM,
        },
      ],

      choiceTwo: [
        {
          sliceName: "town",
          actionName: "createBuilding",
          payload: TOWN_BUILDINGS.MINE,
        },
      ],
    },
  },
  [EVENTS.EXCEPTIONNAL_HARVEST]: {
    name: "Exceptionnal Harvest",
    description:
      "The labor of fields replenishes our stocks this season, for now we can feast.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.HUMANS]: 10,
          },
        },
      ],
    },
  },
  [EVENTS.GOOD_OMEN]: {
    name: "Good Omen",
    description:
      "A sign of good faith from the universe, people give what they have to help the defense.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.SCAVENGED]: 10,
            [RESOURCES.GOLD]: 10,
          },
        },
      ],
    },
  },
  [EVENTS.STRANGE_ORE]: {
    name: "Strange Ore",
    description:
      "We found a peculiar ore in the mines, it feels... otherworldly. What shall we do about it ?",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Get Golds",
      choiceTwoDescription: "Get Souls",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 100,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 10,
          },
        },
      ],
    },
  },
  /// TBD

  [EVENTS.HUMAN_BUYER]: {
    name: "Human Buyer",
    description:
      "The merchant only has his lashes for now, perhaps we could let go some to save the others.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      shops: [
        {
          action: "sellHumans",
          resourceSpent: { [RESOURCES.HUMANS]: 1 },
          resourceGained: { [RESOURCES.GOLD]: 10 },
        },
      ],
    },
  },
  [EVENTS.SCAVENGED_BUYER]: {
    name: "Scavenged Buyer",
    description:
      "He comes around in his caroussel of ticks and tocks, looking for new pieces to add to his rough mechanism.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      shops: [
        {
          action: "sellScavenged",
          resourceSpent: { [RESOURCES.SCAVENGED]: 5 },
          resourceGained: { [RESOURCES.GOLD]: 15 },
        },
      ],
    },
  },

  [EVENTS.HUMAN_SELLER]: {
    name: "Human Seller",
    description:
      "The sounds of lashing, and the complaining of the poor caged devils... Some look like they could be useful, if we have what it takes to pay.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      shops: [
        {
          action: "buyHumans",
          resourceSpent: { [RESOURCES.GOLD]: 12 },
          resourceGained: { [RESOURCES.HUMANS]: 1 },
        },
      ],
    },
  },
  [EVENTS.SCAVENGED_SELLER]: {
    name: "Scavenged Seller",
    description:
      "He roams in the battlefields, checking for useful resources... A rat selling junk, at a fair price.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      shops: [
        {
          action: "buyScavenged",
          resourceSpent: { [RESOURCES.GOLD]: 15 },
          resourceGained: { [RESOURCES.SCAVENGED]: 5 },
        },
      ],
    },
  },

  // TAROT READING

  [EVENTS.THE_FOOL]: {
    name: "0 - The Fool",
    description: "Begginings",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "5",
      choiceTwoDescription: "TEST",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.HUMANS]: 5,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateRandomResources",
          payload: 15,
        },
      ],
    },
  },
  [EVENTS.THE_MAGICIAN]: {
    name: "I - The Magician",
    description: "The power to understand and modify matter",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Transform 25 scavenged to gold",
      choiceTwoDescription: "Transform 25 gold to scavenged",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 25,
          },
        },
        {
          sliceName: "town",
          actionName: "spendResources",
          payload: {
            [RESOURCES.SCAVENGED]: 25,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 10,
          },
        },
      ],
    },
  },
  [EVENTS.THE_HIGH_PRIESTESS]: {
    name: "II - The High Priestess",
    description: "The High Priestess, the knowledge of the past and the future.",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Get 5 Humans",
      choiceTwoDescription: "Destroy 10 Enemies",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.HUMANS]: 5,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "enemy",
          actionName: "destroyEnemy",
          payload: 10,
        },
      ],
    },
  },
  [EVENTS.JUDGEMENT]: {
    name: "XX - Judgement",
    description: "Judgement, a good news, for once.",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Get 50 Scavenged",
      choiceTwoDescription: "Get 25 Golds",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.SCAVENGED]: 50,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 25,
          },
        },
      ],
    },
  },
  [EVENTS.THE_HERMIT]: {
    name: "IX - The Hermit",
    description: "A man living in the woods",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "+5 Bowers",
      choiceTwoDescription: "+10 Golds",
      choiceOne: [
        {
          sliceName: "army",
          actionName: "addUnit",
          payload: { unit: UNIT_TYPES.BOWER, quantity: 5 },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 10,
          },
        },
      ],
    },
  },

  [EVENTS.THE_EMPEROR]: {
    name: "IV - The EMPEROR",
    description: "Guide thy people",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Power",
      choiceTwoDescription: "Riches",
      choiceOne: [
        {
          sliceName: "army",
          actionName: "addMostFormedUnit",
          payload: 10,
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 25,
          },
        },
      ],
    },
  },
  [EVENTS.THE_DEVIL]: {
    name: "XV - The Devil",
    description: "Pacts, Sacrifices, Riches",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      shops: [
        {
          action: "sellHuman",
          resourceSpent: { [RESOURCES.HUMANS]: 5 },
          resourceGained: { [RESOURCES.GOLD]: 25 },
        },
        {
          action: "sellHuman",
          resourceSpent: { [RESOURCES.HUMANS]: 5 },
          resourceGained: { [RESOURCES.SCAVENGED]: 25 },
        },
      ],
    },
  },
  [EVENTS.JUSTICE]: {
    name: "XI - Justice",
    description: "The universe changes over your gaze",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "town",
          actionName: "balanceResources",
          payload: [RESOURCES.GOLD, RESOURCES.SCAVENGED],
        },
      ],
    },
  },
  [EVENTS.THE_WORLD]: {
    name: "XXI - The World",
    description: "The universe changes over your gaze",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "game",
          actionName: "modifyNextWeek",
          payload: WEEK_TYPES.EVENT,
        },
      ],
    },
  },
  [EVENTS.THE_MOON]: {
    name: "XVIII - The Moon",
    description: "Modify things, at your will",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "enemy",
          actionName: "rerollType",
          payload: null,
        },
      ],
    },
  },
  [EVENTS.THE_CHARIOT]: {
    name: "VII - The Charriot",
    description: "Nothing can stop you",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "army",
          actionName: "updateShields",
          payload: {
            target: "melee",
            value: true,
          },
        },
      ],
    },
  },

  [EVENTS.DEATH]: {
    name: "XIII - Death",
    description: "The universe changes over your gaze",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "enemy",
          actionName: "destroyEnemy",
          payload: randomInt(5, 15),
        },
        {
          sliceName: "army",
          actionName: "destroyUnits",
          payload: randomInt(3, 10),
        },
      ],
    },
  },
  [EVENTS.THE_SUN]: {
    name: "XIX - The Sun",
    description: "The sun shines bright on us",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Riches",
      choiceTwoDescription: "Wisdom",
      choiceOne: [
        {
          sliceName: "town",
          actionName: "generateResources",
          payload: {
            [RESOURCES.GOLD]: 50,
          },
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "updateForgeToken",
          payload: true,
        },
      ],
    },
  },
  [EVENTS.THE_HANGED_MAN]: {
    name: "XII - The Hanged Man",
    description: "The universe changes over your gaze",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: [
        {
          sliceName: "army",
          actionName: "updateShields",
          payload: {
            target: "ranged",
            value: true,
          },
        },
      ],
    },
  },
  [EVENTS.THE_EMPRESS]: {
    name: "III - The Empress",
    description: "The silken hand of our beloved leader shall guide us",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Decay",
      choiceTwoDescription: "Prosperity",
      choiceOne: [
        {
          sliceName: "enemy",
          actionName: "divideEnemyForces",
          payload: 0.5,
        },
      ],
      choiceTwo: [
        {
          sliceName: "town",
          actionName: "createBuilding",
          payload: [TOWN_BUILDINGS.FARM],
        },
      ],
    },
  },
  [EVENTS.THE_STARS]: {
    name: "XVII - The Stars",
    description: "May we find what we look for",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Gold",
      choiceTwoDescription: "Scavenged goods",
      choiceOne: [
        {
          sliceName: "army",
          actionName: "updateSeeker",
          payload: SEEKER.GOLDSEEKER,
        },
      ],
      choiceTwo: [
        {
          sliceName: "army",
          actionName: "updateSeeker",
          payload: SEEKER.SCAVENGESEEKER,
        },
      ],
    },
  },
};