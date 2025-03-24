import "./buildingsPannel.scss";
import { useState } from "react";
import { useAppSelector,useAppDispatch } from "app/hooks";

import { TOWN_BUILDINGS } from "enums/TownBuildings";
import { RESOURCES } from "enums/Resources";

import BuildingNode from "./components/buildingNode/BuildingNode";
import BuildingAction from "./components/buildingAction/BuildingAction";
import BuildingResourceExchange from "./components/buildingResourceExchange/BuildingResourceExchange";
import TBI from "components/dev/TBI";

import { updateSpell, updateStats } from "utils/reducers/armyManager";
import { setGlitterfield, updateWeeklyIncome } from "utils/reducers/townManager";
import { SPELLS } from "enums/Spells";

interface BuildingsPannelProps {
  active?: boolean;
}

export default function BuildingsPannel({ active = false }: BuildingsPannelProps) {
  const [selectedMageSpell, setSelectedMageSpell] = useState(SPELLS.NONE);
  
  const townSelector = useAppSelector((state) => state.town);
  const dispatch = useAppDispatch();

  const handleClick = (spell: SPELLS) => {
    setSelectedMageSpell(spell);
    if (spell === SPELLS.GLITTERFIELD) {
      dispatch(setGlitterfield(true))
      dispatch(updateWeeklyIncome())
    }
    else{
      dispatch(setGlitterfield(false))
      dispatch(updateSpell(spell));
      dispatch(updateStats())
    }
    
  };

  return (
    <div className={`buildingsPannel${active ? "" : "-hidden"}`}>
      <h3 className="buildingsPannel__subtitle">Countryside</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.FARM} />
        <BuildingNode building={TOWN_BUILDINGS.MILL} />
        <BuildingNode building={TOWN_BUILDINGS.MINE} />
      </div>
      <h3 className="buildingsPannel__subtitle">Military Quarter</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.FORGE} />
        <BuildingNode building={TOWN_BUILDINGS.TOWER} />
      </div>
      <h3 className="buildingsPannel__subtitle">The Market</h3>
      <div className="buildingsPannel__section buildingsPannel__section-market">
        {townSelector.buildings[TOWN_BUILDINGS.MARKET] !== 0 ? (
          <>
            <div className="buildingsPannel__marketPannel">
              <h4 className="buildingsPannel__marketPannel__title">Buy</h4>
              <div className="buildingsPannel__marketPannel__buttons">
                <BuildingResourceExchange
                  location="shop"
                  name="buyHuman"
                  resourceSpent={{ [RESOURCES.GOLD]: 15 }}
                  resourceGained={{ [RESOURCES.HUMANS]: 1 }}
                />
                <BuildingResourceExchange
                  location="shop"
                  name="buyScavenged"
                  resourceSpent={{ [RESOURCES.GOLD]: 20 }}
                  resourceGained={{ [RESOURCES.SCAVENGED]: 5 }}
                />
              </div>
            </div>
            <div className="buildingsPannel__marketPannel">
              <h4 className="buildingsPannel__marketPannel__title">Sell</h4>
              <div className="buildingsPannel__marketPannel__buttons">
                <BuildingResourceExchange
                  location="shop"
                  name="sellHuman"
                  resourceSpent={{ [RESOURCES.HUMANS]: 1 }}
                  resourceGained={{ [RESOURCES.GOLD]: 7 }}
                />
                <BuildingResourceExchange
                  location="shop"
                  name="sellScavenged"
                  resourceSpent={{ [RESOURCES.SCAVENGED]: 5 }}
                  resourceGained={{ [RESOURCES.GOLD]: 10 }}
                />
              </div>
            </div>
          </>
        ) : (
          <BuildingNode building={TOWN_BUILDINGS.MARKET} />
        )}
      </div>
      <h3 className="buildingsPannel__subtitle">Mage Quarter</h3>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.MAGE_ACADEMY} />
        <BuildingAction
          name={"fireHeart"}
          active={selectedMageSpell === SPELLS.FIREHEART}
          handleClick={() => handleClick(SPELLS.FIREHEART)}
        />
                <BuildingAction
          name={"stormstrike"}
          active={selectedMageSpell === SPELLS.STORMSTRIKE}
          handleClick={() => handleClick(SPELLS.STORMSTRIKE)}
        />
        <BuildingAction
          name={"glitterFields"}
          active={selectedMageSpell === SPELLS.GLITTERFIELD}
          handleClick={() => handleClick(SPELLS.GLITTERFIELD)}
        />
      </div>
      <div className="buildingsPannel__section">
        <BuildingNode building={TOWN_BUILDINGS.QUESTIONABLE_CONCLAVE} />
        <TBI />
      </div>
    </div>
  );
}
