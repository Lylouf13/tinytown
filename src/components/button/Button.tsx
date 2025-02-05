import "./button.scss";

export default function Button({
  label,
  active = true,
  onClick,
  color = "none",
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  color?: string;
}) {
  if (color === "none") {
    color = "";
  } else {
    color = "-" + color;
  }
  return (
    <button
      className={`${active === true ? "button" : "button button-disabled"} ${color === "" ? "" : "button"+color}`}
      onClick={active === true ? onClick : () => null}
    >
      {label}
    </button>
  );
}
