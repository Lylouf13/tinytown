import Button from "components/button/Button";
import "./eventPannel.scss";

import { useState } from "react";
export default function EventPannel() {
  const [isVisible, setisVisible] = useState(false);

  return (
    <div className={`eventPannel${isVisible ? "" : "-hidden"}`}>
      <div className="eventPannel__header">
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
        <h2 className="eventPannel__title">An event in town</h2>
        <img src="assets/icons/timeline/nodeEvent-active.png" alt="banner" />
      </div>
      <div className="eventPannel__content">
        <p> Things here frfr </p>
      </div>
      <Button label="So be it" onClick={() => {setisVisible(!isVisible)}} />
    </div>
  );
}
