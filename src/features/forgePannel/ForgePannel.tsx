import "./forgePannel.scss";

import { unitDatabase } from "models/Units";
import ForgeRow from "./components/forgeRow/ForgeRow";

export default function ForgePannel() {
  return (
    <div className="forge">
      {Object.keys(unitDatabase).map((unit) => (
        <ForgeRow key={`${unit}-trainingRow`} unit={unit} />
      ))}
    </div>
  );
}
