import { useAppDispatch } from "app/hooks";
import "./timelineNode.scss";
import { toggleEventPannel } from "utils/reducers/gameManager";

type TimelineNodeProps = {
  type?: string;
  state?: number;
  id: number;
};
export default function TimelineNode({ type = "NORMAL", state = 0, id = 1 }: TimelineNodeProps) {

  const dispatch = useAppDispatch();
  const eventClickHandler = () => {
    if(id === state)
    dispatch(toggleEventPannel())
  };
  return (
    <>
      {type === "NORMAL" && (
        <img
          className="timelineNode"
          src={`assets/icons/timeline/nodeWeek${id < state ? "-completed" : ""}${id === state ? "-active" : ""}.png`}
          alt="timelineNode"
        />
      )}
      {type === "EVENT" && (
        <img
          className={`timelineNode ${id === state ? "timelineNode-anim" : ""}`}
          onClick={eventClickHandler}
          src={`assets/icons/timeline/nodeEvent${id < state ? "-completed" : ""}${id === state ? "-active" : ""}.png`}
          alt="event-timelineNode"
        />
      )}
      {type === "BOSS" && (
        <img
          className="timelineNode"
          src={`assets/icons/timeline/nodeBoss${id < state ? "-completed" : ""}${id === state ? "-active" : ""}.png`}
          alt="boss-timelineNode"
        />
      )}
    </>
  );
}
