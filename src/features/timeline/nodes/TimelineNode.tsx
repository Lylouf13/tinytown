import "./timelineNode.scss";

type TimelineNodeProps = {
  type?: string;
  state?: number;
  id:number
};
export default function TimelineNode({ type = "default", state=0, id=1}: TimelineNodeProps) {
  return (
    <>
      {type === "default" && (
        <img className="timelineNode" src={`assets/icons/timeline/nodeWeek${id<state ? "-completed" : ""}${id===state?"-active":""}.png`} alt="timelineNode" />
      )}
      {type === "event" && (
        <img className="timelineNode" src={`assets/icons/timeline/nodeEvent${id<state ? "-completed" : ""}${id===state?"-active":""}.png`} alt="event-timelineNode" />
      )}
      {type === "boss" && (
        <img className="timelineNode" src={`assets/icons/timeline/nodeBoss${id<state ? "-completed" : ""}${id===state?"-active":""}.png`} alt="boss-timelineNode" />
      )}
    </>
  );
}
