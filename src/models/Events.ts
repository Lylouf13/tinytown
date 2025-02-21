import { EVENTS } from "enums/Events";
import { RESOURCES } from "enums/Resources";

export enum EVENT_TYPES {
  EVENT = "Event",
  CHOICE = "Choice",
  SHOP = "Shop",
}

type EventEffects =
  | {
      // Casualty
      type: EVENT_TYPES.EVENT;
      effect: () => void;
    }
  | {
      // Choice
      type: EVENT_TYPES.CHOICE;
      choiceOneDescription: string;
      choiceTwoDescription: string;
      choiceOne: () => void;
      choiceTwo: () => void;
    }
  | {
      // Shop
      type: EVENT_TYPES.SHOP;
      action: string;
      resourceSpent: { [key: string]: number };
      resourceGained: { [key: string]: number };
    };

export interface Event {
  name: string;
  event: EVENTS;
  description: string;
  eventEffect: EventEffects;
}

export const eventDatabase: { [key in EVENTS]: Event } = {
  [EVENTS.NONE]: { name: "None", event: EVENTS.NONE, description: "", eventEffect: { type: EVENT_TYPES.EVENT, effect: () => {} } },

  // ECONOMY
  [EVENTS.ENTHUSIASTIC_MASONRY]: {
    name: "Enthusiastic Masonry",
    event: EVENTS.ENTHUSIASTIC_MASONRY,
    description: "Masons are working their life for this town, reasonable or not, it's a good thing for our resources.",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Build a free Farm",
      choiceTwoDescription: "Build a free Mine",
      choiceOne: () => {},
      choiceTwo: () => {},
    },
  },
  [EVENTS.EXCEPTIONNAL_HARVEST]: {
    name: "Exceptionnal Harvest",
    event: EVENTS.EXCEPTIONNAL_HARVEST,
    description: "The labor of fields replenishes our stocks this season, for now we can feast.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: () => {},
    },
  },
  [EVENTS.GOOD_OMEN]: {
    name: "Good Omen",
    event: EVENTS.GOOD_OMEN,
    description: "A sign of good faith from the universe, soldiers feel their spirits lifted.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: () => {},
    },
  },
  [EVENTS.STRANGE_ORE]: {
    name: "Strange Ore",
    event: EVENTS.STRANGE_ORE,
    description: "We found a peculiar ore in the mines, it feels... otherworldly. What shall we do about it ?",
    eventEffect: {
      type: EVENT_TYPES.CHOICE,
      choiceOneDescription: "Build a free Mine",
      choiceTwoDescription: "Build a free Farm",
      choiceOne: () => {},
      choiceTwo: () => {},
    },
  },
  /// TBD

  [EVENTS.HUMAN_BUYER]: {
    name: "Human Buyer",
    event: EVENTS.HUMAN_BUYER,
    description: "The merchant only has his lashes for now, perhaps we could let go some to save the others.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      action: "sellHuman",
      resourceSpent: { [RESOURCES.HUMANS]: 1 },
      resourceGained: { [RESOURCES.GOLD]: 1 },
    },
  },
  [EVENTS.SCAVENGED_BUYER]: {
    name: "Scavenged Buyer",
    event: EVENTS.SCAVENGED_BUYER,
    description: "He comes around in his caroussel of ticks and tocks, looking for new pieces to add to his rough mechanism.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      action: "sellScavenged",
      resourceSpent: { [RESOURCES.SCAVENGED]: 1 },
      resourceGained: { [RESOURCES.GOLD]: 1 },
    },
  },

  [EVENTS.HUMAN_SELLER]: {
    name: "Human Seller",
    event: EVENTS.HUMAN_SELLER,
    description:
      "The sounds of lashing, and the complaining of the poor caged devils... Some look like they could be useful, if we have what it takes to pay.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      action: "buyHuman",
      resourceSpent: { [RESOURCES.GOLD]: 1 },
      resourceGained: { [RESOURCES.HUMANS]: 1 },
    },
  },
  [EVENTS.SCAVENGED_SELLER]: {
    name: "Scavenged Seller",
    event: EVENTS.SCAVENGED_SELLER,
    description: "He roams in the battlefields, checking for useful resources... A rat selling junk, at a fair price.",
    eventEffect: {
      type: EVENT_TYPES.SHOP,
      action: "buyScavenged",
      resourceSpent: { [RESOURCES.GOLD]: 1 },
      resourceGained: { [RESOURCES.SCAVENGED]: 1 },
    },
  },

  // ARMY
  [EVENTS.RAINSTORM]: {
    name: "Rainstorm",
    event: EVENTS.RAINSTORM,
    description: "The storm is upon us.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: () => {},
    },
  },
  [EVENTS.BURNING_SUN]: {
    name: "Burning Sun",
    event: EVENTS.BURNING_SUN,
    description: "You have received a burning sun.",
    eventEffect: {
      type: EVENT_TYPES.EVENT,
      effect: () => {},
    },
  },
};
