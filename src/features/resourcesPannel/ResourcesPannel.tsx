import { useAppSelector } from "app/hooks";
import "./resourcesPannel.scss";

export default function ResourcesPannel() {
  const townSelector = useAppSelector((state) => state.town);
  const resources = townSelector.resources;

  return (
    <div className="resources">
      <h2 className="resources__title">Resources |</h2>
      {Object.entries(resources).map((resource) => (
        <div key={`${resource[0]}-container`} className="resources__container">
          <img
            key={`resource__icon-${resource[0]}`}
            className="resources__icon"
            src={`/assets/icons/resources/${resource[0]}.png`}
            alt={`icon-${resource[0]}`}
          />
          <p
            className={`resources__text resources__text--${resource[0]}`}
            key={resource[0]}
          >
            {resource[1]}
          </p>
        </div>
      ))}
    </div>
  );
}
