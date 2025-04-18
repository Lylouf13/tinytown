import { createSlice } from "@reduxjs/toolkit";
import { EVENTS } from "enums/Events";
import { BOSSES } from "enums/Bosses";
import { WEEK_TYPES } from "enums/WeekTypes";

export enum GAME_STATE {
  PREPARATION = "preparation",
  FIGHT = "fight",
  DEFEAT = "defeat",
}
export enum FIGHT_STATE {
  BEFORE = "before",
  PRE_FIGHT = "pre-fight",
  ATTACK_MELEE = "attack_melee",
  ATTACK_RANGED = "attack_ranged",
  POST_FIGHT = "post-fight",
}

interface GameState {
  state: GAME_STATE;
  fightState: FIGHT_STATE;
  week: number;
  currentEvent: EVENTS;
  currentBoss: BOSSES;
  eventPannel: boolean;
  eventConsumed: boolean;
  timeline: WEEK_TYPES[];
  timelineState: number;
  timelineDuration: number;
}
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const timelineRoll = () => {
  var weekTypes: string[] = Object.keys(WEEK_TYPES);
  var timeline: WEEK_TYPES[] = [];
  var eventCooldown: boolean = false;
  var roll: number = 0;
  var totalEvents: number = 0;
  var maxEvents: number = 3;
  var badLuckProtection: number = 0;

  for (var i = 0; i < 12; i++) {
    if (i <= 1 || (i < 11 && eventCooldown) || (i < 11 && totalEvents >= maxEvents)) {
      timeline.push(WEEK_TYPES.NORMAL);
      eventCooldown = false;
    } else if (i < 11 && !eventCooldown && totalEvents < maxEvents) {
      roll = Math.floor(randomInt(0, weekTypes.length - 2) + badLuckProtection);
      if (roll === 2) roll = 1;
      if (roll >= 1) {
        eventCooldown = true;
        totalEvents++;
        badLuckProtection = 0;
      }
      badLuckProtection += 0.3;
      timeline.push(weekTypes[roll] as WEEK_TYPES);
    } 
    // REPLACE WHEN IMPLEMENTING BOSSES
    // else timeline.push(WEEK_TYPES.BOSS);
    else timeline.push(WEEK_TYPES.NORMAL);
  }
  return timeline;
};

const eventRoll = () => {
  var eventKeys: string[] = Object.keys(EVENTS);
  return eventKeys[randomInt(1, eventKeys.length - 1)] as EVENTS;
  //  return EVENTS.HUMAN_SELLER;
};

const bossRoll = () => {
  var bossKeys: string[] = Object.keys(BOSSES);
  return bossKeys[randomInt(0, bossKeys.length - 1)] as BOSSES;
};

const initialState: GameState = {
  state: GAME_STATE.PREPARATION,
  fightState: FIGHT_STATE.BEFORE,
  week: 1,
  currentEvent: EVENTS.NONE,
  currentBoss: bossRoll(),
  eventPannel: false,
  eventConsumed: true,
  timeline: timelineRoll(),
  timelineState: 1,
  timelineDuration: 12,
};

export const gameManagerSlice = createSlice({
  name: "gameManager",
  initialState,
  reducers: {
    /// Global reducers
    setNextWeek: (state) => {
      const week = state.week + 1;
      var currentEvent = state.currentEvent;
      var timelineState = state.timelineState;
      var eventConsumed = state.eventConsumed;
      timelineState =
        state.timelineState < state.timelineDuration ? state.timelineState + 1 : 1;

      if (state.timeline[timelineState - 1] !== WEEK_TYPES.NORMAL) {
        if (state.timeline[timelineState - 1] === WEEK_TYPES.EVENT) {
          currentEvent = eventRoll();
        }
        eventConsumed = false;
      }

      return {
        ...state,
        week,
        timelineState,
        currentEvent,
        eventConsumed,
      };
    },
    updateGameState: (state, action) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    updateFightState: (state, action) => {
      return {
        ...state,
        fightState: action.payload,
      };
    },
    generateNewTimeline: (state) => {
      return {
        ...state,
        timeline: timelineRoll(),
      };
    },
    toggleEventPannel: (state) => {
      return {
        ...state,
        eventPannel: !state.eventPannel,
      };
    },
    modifyNextWeek: (state, action) => {
      state.timeline[state.timelineState] = action.payload;
    },

    consumeEvent: (state) => {
      return {
        ...state,
        eventConsumed: true,
      };
    },

    /// Event reducers
  },
});

export const {
  setNextWeek,
  updateGameState,
  updateFightState,
  generateNewTimeline,
  toggleEventPannel,
  modifyNextWeek,
  consumeEvent,
} = gameManagerSlice.actions;

export default gameManagerSlice.reducer;
