import { useState } from "react";
import TalentPannel from "./subPannels/talentPannel/TalentPannel";
import Button from "components/button/Button";
import "./economyPannel.scss";

export default function EconomyPannel() {

  const [currentPannel, setCurrentPannel] = useState("Talents");
  return (
    <div className="economy">
      <h2 className="economy__title">Economy</h2>
      <div className="economy__buttons">
        <Button label="Town" onClick={() => setCurrentPannel("Town")} />
        <Button label="Talents" onClick={() => setCurrentPannel("Talents")} />
      </div>
      <h3 className="economy__subtitle">{currentPannel}</h3>
      {currentPannel === "Town" && <p> Town pannels gg</p>}
      {currentPannel === "Talents" && <TalentPannel />}
    </div>
  );
}
