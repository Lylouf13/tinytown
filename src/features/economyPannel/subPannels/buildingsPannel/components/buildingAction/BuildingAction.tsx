import "./buildingAction.scss";

interface BuildingActionProps {
  name: string;
  active?: boolean;
  handleClick?: () => void;
}

export default function BuildingAction({
  name,
  active = false,
  handleClick,
}: BuildingActionProps) {
  return (
    <button className="buildingAction">
      <img
        onClick={handleClick}
        className="buildingAction__icon"
        src={`assets/icons/actions/${name}${active ? "-active" : ""}.png`}
        alt={`buildingAction-${name}`}
      />
    </button>
  );
}
