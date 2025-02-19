import { EVENTS } from "enums/Events";

export interface Event {
  name: string;
  event: EVENTS;
  description: string;
  type: string;
  effect: string;
}

export const eventDatabase: { [key in EVENTS]: Event } = {
  [EVENTS.NONE]: { name: "None", event: EVENTS.NONE, description: "", type: "", effect: "" },

  // ECONOMY
  [EVENTS.ENTHUSIASTIC_MASONRY]: {
    name: "Enthusiastic Masonry",
    event: EVENTS.ENTHUSIASTIC_MASONRY,
    description: "Masons are working their life for this town, reasonable or not, it's a good thing for our resources.",
    type: "Town",
    effect: "+1 farm OR mine",
  },
  [EVENTS.EXCEPTIONNAL_HARVEST]: {
    name: "Exceptionnal Harvest",
    event: EVENTS.EXCEPTIONNAL_HARVEST,
    description: "The labor of fields replenishes our stocks this season, for now we can feast.",
    type: "Town",
    effect: "Gold +1",
  },
  [EVENTS.GOOD_OMEN]: {
    name: "Good Omen",
    event: EVENTS.GOOD_OMEN,
    description: "A sign of good faith from the universe, soldiers feel their spirits lifted.",
    type: "Town",
    effect: "Gold +1",
  },
  [EVENTS.STRANGE_ORE]: {
    name: "Strange Ore",
    event: EVENTS.STRANGE_ORE,
    description: "We found a peculiar ore in the mines, it feels... otherworldly. What shall we do about it ?",
    type: "Town",
    effect: "Scavenged +1",
  },
  /// TBD

  [EVENTS.HUMAN_BUYER]: {
    name: "Human Buyer",
    event: EVENTS.HUMAN_BUYER,
    description: "The merchant only has his lashes for now, perhaps we could let go some to save the others.",
    type: "Economy",
    effect: "Humans +1",
  },
  [EVENTS.SCAVENGED_BUYER]: {
    name: "Scavenged Buyer",
    event: EVENTS.SCAVENGED_BUYER,
    description: "He comes around in his caroussel of ticks and tocks, looking for new pieces to add to his rough mechanism.",
    type: "Economy",
    effect: "Scavenged +1",
  },

  [EVENTS.HUMAN_SELLER]: {
    name: "Human Seller",
    event: EVENTS.HUMAN_SELLER,
    description:
      "The sounds of lashing, and the complaining of the poor caged devils... Some look like they could be useful, if we have what it takes to pay.",
    type: "Economy",
    effect: "Humans +1",
  },
  [EVENTS.SCAVENGED_SELLER]: {
    name: "Scavenged Seller",
    event: EVENTS.SCAVENGED_SELLER,
    description: "He roams in the battlefields, checking for useful resources... A rat selling junk, at a fair price.",
    type: "Economy",
    effect: "Scavenged +1",
  },

  // ARMY
  [EVENTS.RAINSTORM]: {
    name: "Rainstorm",
    event: EVENTS.RAINSTORM,
    description: "The storm is upon us.",
    type: "Army",
    effect: "All units gain +1 strength",
  },
  [EVENTS.BURNING_SUN]: {
    name: "Burning Sun",
    event: EVENTS.BURNING_SUN,
    description: "You have received a burning sun.",
    type: "Army",
    effect: "All units gain +1 strength",
  },
};
