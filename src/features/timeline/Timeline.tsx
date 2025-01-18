import { useAppSelector } from "app/hooks";
import TimelineNode from "./nodes/TimelineNode";

import "./timeline.scss";

export default function Timeline() {
  const gameSelector = useAppSelector((state) => state.game);

  const currentNode = gameSelector.timelineState;

  return (
    <div className="timeline">
      <h2 className="timeline__title">Week {gameSelector.week}</h2>
      <div className="timeline__nodes">
        <TimelineNode state={currentNode} id={1} />
        <TimelineNode state={currentNode} id={2} />
        <TimelineNode state={currentNode} id={3} />
        <TimelineNode state={currentNode} id={4} type="event" />
        <TimelineNode state={currentNode} id={5} />
        <TimelineNode state={currentNode} id={6} />
        <TimelineNode state={currentNode} id={7} />
        <TimelineNode state={currentNode} id={8} />
        <TimelineNode state={currentNode} id={9} type="event" />
        <TimelineNode state={currentNode} id={10} />
        <TimelineNode state={currentNode} id={11} />
        <TimelineNode state={currentNode} id={12} type="boss" />
      </div>
    </div>
  );
}
