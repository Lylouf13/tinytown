import "./toggleButtons.scss";

interface toggleButtonProps {
  label: string;
  active?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export default function ToggleButton({
  label,
  active = true,
  selected = false,
  onClick,
}: toggleButtonProps) {
  const handleClick = () => {
    onClick();
  };

  let buttonState: string = "toggleButton";
  if (!active) {
    buttonState = " toggleButton-disabled";
  }else if (selected){
    buttonState = " toggleButton-selected";
  }
  return (
    <button
      className={buttonState}
      onClick={active === true ? handleClick : () => null}
    >
      {label}
    </button>
  );
}
