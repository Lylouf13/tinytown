import Button from "components/button/Button";
import "./eventPannel.scss";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { WEEK_TYPES } from "enums/WeekTypes";
import { EVENT_TYPES } from "models/Events";
import { eventDatabase } from "models/Events";
import { Event } from "models/Events";

import { toggleEventPannel } from "utils/reducers/gameManager";

import BuildingResourceExchange from "features/economyPannel/subPannels/buildingsPannel/components/buildingResourceExchange/BuildingResourceExchange";

export default function EventPannel() {
  const gameSelector = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameSelector.timeline[gameSelector.timelineState - 1] === WEEK_TYPES.EVENT) {
      dispatch(toggleEventPannel());
      console.log(gameSelector.timeline[gameSelector.timelineState - 1]);
    }
  }, [gameSelector.timeline, gameSelector.timelineState, dispatch]);

  const event = gameSelector.currentEvent;
  const eventData: Event = eventDatabase[event];
  return (
    <div
      className={`eventPannel${
        gameSelector.timeline[gameSelector.timelineState - 1] === WEEK_TYPES.EVENT && gameSelector.eventPannel ? "" : "-hidden"
      }`}
    >
      <div className="eventPannel__header">
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
        <h2 className="eventPannel__title">An event in town</h2>
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
      </div>
      <div className="eventPannel__content">
        <h3>{eventData.name}</h3>
        <p> {eventData.description} </p>
        {eventData.eventEffect.type === EVENT_TYPES.SHOP && (
          <div>
            <BuildingResourceExchange
              name={eventData.eventEffect.action}
              resourceSpent={eventData.eventEffect.resourceSpent}
              resourceGained={eventData.eventEffect.resourceGained}
            />
          </div>
        )}

        {eventData.eventEffect.type === EVENT_TYPES.EVENT && (
          <div>
            <p>this happened, lucky (or not) </p>
          </div>
        )}
        {eventData.eventEffect.type === EVENT_TYPES.CHOICE && (
          <div>
            <Button label="Choice1" onClick={eventData.eventEffect.choiceOne} />
            <Button label="Choice2" onClick={eventData.eventEffect.choiceTwo} />
          </div>
        )}
      </div>
      <Button
        label="So be it"
        onClick={() => {
          dispatch(toggleEventPannel());
        }}
      />
    </div>
  );
}
