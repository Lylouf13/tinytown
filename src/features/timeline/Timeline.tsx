import TimelineNode from "./nodes/TimelineNode"

import "./timeline.scss"

export default function Timeline() {
  return (
    <div className="timeline">
        <TimelineNode />
        <TimelineNode />
        <TimelineNode />
        <TimelineNode />
        <TimelineNode type="event"/>
        <TimelineNode />
        <TimelineNode />
        <TimelineNode />
        <TimelineNode />
        <TimelineNode type="event"/>
        <TimelineNode />
        <TimelineNode />
    </div>
  )
}

