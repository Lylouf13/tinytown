import { useState } from "react";
import TalentPannel from "./subPannels/talentPannel/TalentPannel";
import BuildingsPannel from "./subPannels/buildingsPannel/BuildingsPannel";
import Button from "components/button/Button";
import ToggleButton from "components/toggleButton/ToggleButton";
import "./economyPannel.scss";

export default function EconomyPannel() {

  const [currentPannel, setCurrentPannel] = useState("Town");
  return (
    <div className="economy">
      <img className="town__banner" src="assets/banners/EconomyBanner.png" alt="banner" />
      <div className="economy__pannel">
      <h1 className="economy__title">Economy</h1>
      <div className="economy__buttons">
        <ToggleButton selected={currentPannel === "Town"} label="Town" onClick={() => setCurrentPannel("Town")} />
        <ToggleButton selected={currentPannel === "Talents"} label="Talents" onClick={() => setCurrentPannel("Talents")} />
      </div>
      <h2 className="economy__subtitle">{currentPannel}</h2>

      <BuildingsPannel active={currentPannel === "Town"}/>
      <TalentPannel active={currentPannel === "Talents"}/>
      </div>
      <img className="town__banner" src="assets/banners/BannerBottom.png" alt="banner" />
    </div>
  );
}
