import "./forgePannel.scss";

import { useAppSelector } from "app/hooks";

import { unitDatabase } from "models/Units";

import ForgeRow from "./components/forgeRow/ForgeRow";

export default function ForgePannel() {
  const armySelector = useAppSelector((state) => state.army);
  return (
    <div className="forge">
      {Object.keys(unitDatabase).map((unit) => (
        <ForgeRow key={`${unit}-trainingRow`} unit={unit} />
      ))}
    </div>
  );
}
