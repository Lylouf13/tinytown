import Button from "components/button/Button";
import "./eventPannel.scss";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { WEEK_TYPES } from "enums/WeekTypes";
import { Event, EVENT_TYPES, eventDatabase, ShopAction } from "models/Events";
import { SliceAction } from "models/Slices";

import { consumeEvent, gameManagerSlice, toggleEventPannel } from "utils/reducers/gameManager";
import { townManagerSlice } from "utils/reducers/townManager";
import { armyManagerSlice } from "utils/reducers/armyManager";
import { enemyManagerSlice } from "utils/reducers/enemyManager";

import BuildingResourceExchange from "features/economyPannel/subPannels/buildingsPannel/components/buildingResourceExchange/BuildingResourceExchange";

export default function EventPannel() {
  const gameSelector = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const sliceActions: { [key: string]: any } = {
    game: gameManagerSlice,
    town: townManagerSlice,
    army: armyManagerSlice,
    enemy: enemyManagerSlice,
  };

  useEffect(() => {
    if (gameSelector.timeline[gameSelector.timelineState - 1] === WEEK_TYPES.EVENT) {
      dispatch(toggleEventPannel());
      console.log(gameSelector.timeline[gameSelector.timelineState - 1]);
    }
  }, [gameSelector.timeline, gameSelector.timelineState, dispatch]);

  const event = gameSelector.currentEvent;
  const eventData: Event = eventDatabase[event];

  const handleChoiceEvent = (actions: SliceAction[]) => {
    actions.forEach(action => {
      if (action.sliceName in sliceActions) {
        const slice = sliceActions[action.sliceName];
        if (action.actionName in slice.actions) {
          const actionCreator = slice.actions[action.actionName];
          dispatch(actionCreator(action.payload));
        }
      }
    });
    dispatch(consumeEvent())
  };
  const renderEventContent = () => {
    const effect = eventData.eventEffect;

    switch (effect.type) {
      case EVENT_TYPES.SHOP:
        return (
          <div>
            {effect.shops.map((shop: ShopAction) => (
              <BuildingResourceExchange location="event"name={shop.action} resourceSpent={shop.resourceSpent} resourceGained={shop.resourceGained} />
            ))}
          </div>
        );

      case EVENT_TYPES.EVENT:
        return (
          <div>
            <p>this happened</p>
            <Button active={!gameSelector.eventConsumed} label="Accept" onClick={() => handleChoiceEvent(effect.effect)} />
          </div>
        );

      case EVENT_TYPES.CHOICE:
        return (
          <div>
            <Button active={!gameSelector.eventConsumed} label={effect.choiceOneDescription} onClick={() => handleChoiceEvent(effect.choiceOne)} />
            <Button active={!gameSelector.eventConsumed} label={effect.choiceTwoDescription} onClick={() => handleChoiceEvent(effect.choiceTwo)} />
          </div>
        );

      default:
        return null;
    }
  };

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
        <p>{eventData.description}</p>
        {renderEventContent()}
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
