import { createSlice } from "@reduxjs/toolkit";
import { EVENTS } from "enums/Events";
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
  eventWeek: EVENTS;
  timeline: WEEK_TYPES[];
  timelineState: number;
  timelineDuration: number;
}
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const timelineRoll = () => {
  var weekTypes: string[] = Object.keys(WEEK_TYPES);
  var timeline: WEEK_TYPES[] = [];
  var eventCooldown: boolean = false;
  var roll: number = 0;
  var totalEvents: number = 0;
  var maxEvents: number = 3;

  for (var i = 0; i < 12; i++) {
    if (i <= 1 || (i < 11 && eventCooldown) || (i < 11 && totalEvents >= maxEvents)) {
      timeline.push(WEEK_TYPES.NORMAL);
      eventCooldown = false;
    } else if (i < 11 && !eventCooldown && totalEvents < maxEvents) {
      roll = randomInt(0, weekTypes.length - 2);
      if (roll === 1) {
        eventCooldown = true;
        totalEvents++;
      }
      timeline.push(weekTypes[roll] as WEEK_TYPES);
    } else timeline.push(WEEK_TYPES.BOSS);
  }
  return timeline;
};

const initialState: GameState = {
  state: GAME_STATE.PREPARATION,
  fightState: FIGHT_STATE.BEFORE,
  week: 1,
  eventWeek: EVENTS.NONE,
  timeline: timelineRoll(),
  timelineState: 1,
  timelineDuration: 12,
};

export const gameManagerSlice = createSlice({
  name: "gameManager",
  initialState,
  reducers: {
    setNextWeek: (state) => {
      const week = state.week + 1;
      var eventWeek = state.eventWeek;

      if (week === 2) {
        eventWeek = EVENTS.ENTHUSIASTIC_MASONRY;
      }

      return {
        ...state,
        week,
        eventWeek,
        timelineState: state.timelineState < state.timelineDuration ? state.timelineState + 1 : 1,
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
  },
});

export const { setNextWeek, updateGameState, updateFightState } = gameManagerSlice.actions;

export default gameManagerSlice.reducer;
