import { useState } from "react";
import TalentPannel from "./subPannels/talentPannel/TalentPannel";
import BuildingsPannel from "./subPannels/buildingsPannel/BuildingsPannel";
import ToggleButton from "components/toggleButton/ToggleButton";
import { useAppSelector } from "app/hooks";
import { TOWN_BUILDINGS } from "enums/TownBuildings";
import "./economyPannel.scss";

export default function EconomyPannel() {
  const townSelector = useAppSelector((state) => state.town);
  const [currentPannel, setCurrentPannel] = useState("Town");
  return (
    <div className="economy">
      <img
        className="town__banner"
        src="assets/banners/EconomyBanner.png"
        alt="banner"
      />
      <div className="economy__pannel">
        <h1 className="economy__title">Economy</h1>
        <div className="economy__buttons">
          <ToggleButton
            selected={currentPannel === "Town"}
            label="Town"
            onClick={() => setCurrentPannel("Town")}
          />
          <ToggleButton
            active={
              townSelector.buildings[TOWN_BUILDINGS.FORGE] === 1 ? true : false
            }
            selected={currentPannel === "Talents"}
            label="Talents"
            onClick={() => setCurrentPannel("Talents")}
          />
        </div>
        <h2 className="economy__subtitle">{currentPannel}</h2>

        <BuildingsPannel active={currentPannel === "Town"} />
        <TalentPannel active={currentPannel === "Talents"} />
      </div>
      <img
        className="town__banner"
        src="assets/banners/BannerBottom.png"
        alt="banner"
      />
    </div>
  );
}
