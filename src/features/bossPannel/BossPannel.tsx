import "./bossPannel.scss"
import Button from "components/button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Boss, bossDatabase } from "models/Bosses";

export default function BossPannel() {

  const gameSelector = useAppSelector((state) => state.game);

  const currentBoss = gameSelector.currentBoss;
  const bossData : Boss = bossDatabase[currentBoss];
  console.log(bossDatabase[currentBoss])
  return (
    <div className="bossPannel">
    <h1>Boss</h1>
    <img className="bossPannel__art" src={`assets/banners/enemies/bosses/${bossData.image}.png`} alt="bossArt"/>
    <p className="bossPannel__description">{bossData.description}</p>
    <p className="bossPannel__effect">Il se passe ça</p>
          <Button
            label="So be it"
            onClick={ () => {} }
          />
    </div>
  )
}
