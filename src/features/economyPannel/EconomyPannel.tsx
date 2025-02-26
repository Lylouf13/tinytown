import BuildingsPannel from "./subPannels/buildingsPannel/BuildingsPannel";

import "./economyPannel.scss";

export default function EconomyPannel() {
  return (
    <div className="economy">
      <img className="town__banner" src="assets/banners/EconomyBanner.png" alt="banner" />
      <div className="economy__pannel">
        <h1 className="economy__title">Economy</h1>
        <BuildingsPannel active={true} />
      </div>
      <img className="town__banner" src="assets/banners/BannerBottom.png" alt="banner" />
    </div>
  );
}
