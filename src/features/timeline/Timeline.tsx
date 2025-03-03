import { useAppSelector } from "app/hooks";
import TimelineNode from "./nodes/TimelineNode";

import "./timeline.scss";
import TBI from "components/dev/TBI";

export default function Timeline() {
  const gameSelector = useAppSelector((state) => state.game);

  const currentNode = gameSelector.timelineState;

  return (
    <div className="timeline">
      <h2 className="timeline__title">Week {gameSelector.week}</h2>
      <TBI />
      <div className="timeline__nodes">
        {gameSelector.timeline.map((node, index) => (
          <TimelineNode
            state={currentNode}
            id={index + 1}
            key={node + index}
            type={node}
          />
        ))}
      </div>
    </div>
  );
}
