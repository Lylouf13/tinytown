

type TimelineNodeProps = {
    type?: string
}
export default function TimelineNode({type="default"}: TimelineNodeProps) {
  return (
    <>
    {(type === "default") &&
        <span className={`timeline__node timeline__node--${type}`}></span>
    }
    {(type === "event") &&
    <div className="timeline__nodeContainer">
        <span className={`timeline__node timeline__node-event`}></span>
        <span className={`timeline__node timeline__node-eventBottom`}></span>
    </div>
    }
    </>
  )
}
