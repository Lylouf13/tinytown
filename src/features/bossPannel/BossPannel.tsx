import "./bossPannel.scss";
import Button from "components/button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Boss, bossDatabase } from "models/Bosses";
import { toggleEventPannel } from "utils/reducers/gameManager";
import { useEffect } from "react";

import { WEEK_TYPES } from "enums/WeekTypes";
export default function BossPannel() {
  const dispatch = useAppDispatch();
  const gameSelector = useAppSelector((state) => state.game);

  const currentBoss = gameSelector.currentBoss;
  const bossData: Boss = bossDatabase[currentBoss];

  useEffect(() => {
    if (gameSelector.timeline[gameSelector.timelineState - 1] === WEEK_TYPES.BOSS) {
      dispatch(toggleEventPannel());
    }
  }, [gameSelector.timeline, gameSelector.timelineState, dispatch]);

  return (
    (gameSelector.eventPannel && gameSelector.timeline[gameSelector.timelineState-1] === WEEK_TYPES.BOSS) && (
      <div className="bossPannel">
        <h1>Boss</h1>
        <img
          className="bossPannel__art"
          src={`assets/banners/enemies/bosses/${bossData.image}.png`}
          alt="bossArt"
        />
        <p className="bossPannel__description">{bossData.description}</p>
        <p className="bossPannel__effect">Il se passe ça</p>
        <Button
          label="So be it"
          onClick={() => {
            dispatch(toggleEventPannel());
          }}
        />
      </div>
    )
  );
}
