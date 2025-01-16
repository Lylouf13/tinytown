type TimelineNodeProps = {
  type?: string;
};
export default function TimelineNode({ type = "default" }: TimelineNodeProps) {
  return (
    <>
      {type === "default" && (
        // <span className={`timeline__node timeline__node--${type}`}></span>
        <img src="assets/icons/timeline/nodeWeek.png" alt="timelineNode" />
      )}
      {type === "event" && (
        <>
          <div className="timeline__nodeContainer">
            <img src="assets/icons/timeline/nodeEvent.png" alt="timelineNode" />
          </div>
          <div className="timeline__nodeContainer">
            <img
              src="assets/icons/timeline/nodeEvent-completed.png"
              alt="timelineNode"
            />
          </div>
          <div className="timeline__nodeContainer">
            <img
              src="assets/icons/timeline/nodeWeek-completed.png"
              alt="timelineNode"
            />
          </div>
          <div className="timeline__nodeContainer">
            <img src="assets/icons/timeline/nodeBoss.png" alt="timelineNode" />
          </div>{" "}
          <div className="timeline__nodeContainer">
            <img src="assets/icons/timeline/nodeBoss-completed.png" alt="timelineNode" />
          </div>
        </>
      )}
      {type === "boss" && (
        <div className="timeline__nodeContainer">
          <img src="assets/icons/timeline/nodeBoss.png" alt="timelineNode" />

          {/* <span className={`timeline__node timeline__node-event`}></span>
        <span className={`timeline__node timeline__node-eventBottom`}></span> */}
        </div>
      )}
    </>
  );
}
