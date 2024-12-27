import { useState } from "react";
import TalentPannel from "./subPannels/talentPannel/TalentPannel";
import BuildingsPannel from "./subPannels/buildingsPannel/BuildingsPannel";
import Button from "components/button/Button";
import "./economyPannel.scss";

export default function EconomyPannel() {

  const [currentPannel, setCurrentPannel] = useState("Town");
  return (
    <div className="economy">
      <img className="town__banner" src="assets/banners/EconomyBanner.png" alt="banner" />
      <div className="economy__pannel">
      <h2 className="economy__title">Economy</h2>
      <div className="economy__buttons">
        <Button label="Town" onClick={() => setCurrentPannel("Town")} />
        <Button label="Talents" onClick={() => setCurrentPannel("Talents")} />
      </div>
      <h3 className="economy__subtitle">{currentPannel}</h3>

      <BuildingsPannel active={currentPannel === "Town"}/>
      <TalentPannel active={currentPannel === "Talents"}/>
      </div>
    </div>
  );
}
