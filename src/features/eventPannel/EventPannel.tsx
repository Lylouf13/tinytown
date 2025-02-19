import Button from "components/button/Button";
import "./eventPannel.scss";

import { useEffect, useState } from "react";
import { useAppSelector } from "app/hooks";

import { WEEK_TYPES } from "enums/WeekTypes";
import { eventDatabase } from "models/Events";


export default function EventPannel() {
  const gameSelector = useAppSelector((state) => state.game);
  const [isOpened, setIsOpened] = useState(gameSelector.timeline[gameSelector.timelineState-1] === WEEK_TYPES.EVENT);

  useEffect(() => {
    if (gameSelector.timeline[gameSelector.timelineState-1] === WEEK_TYPES.EVENT) {
      setIsOpened(true);
      console.log(gameSelector.timeline[gameSelector.timelineState-1])

    }
  }, [gameSelector.timeline, gameSelector.timelineState]);

  const event = gameSelector.currentEvent
  return (
    <div className={`eventPannel${gameSelector.timeline[gameSelector.timelineState-1] === WEEK_TYPES.EVENT && isOpened ? "" : "-hidden"}`}>
      <div className="eventPannel__header">
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
        <h2 className="eventPannel__title">An event in town</h2>
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
      </div>
      <div className="eventPannel__content">
        <h3>{eventDatabase[event].name}</h3>
        <p> {eventDatabase[event].description} </p>
      </div>
      <Button
        label="So be it"
        onClick={() => {
          setIsOpened(false);
        }}
      />
    </div>
  );
}
