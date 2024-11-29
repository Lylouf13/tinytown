import UnitIcon from "../../../components/unitIcon/UnitIcon";
import Button from "../../../components/button/Button";

interface UnitTrainingRowProps {
  unit: string;
  cost: number;
  quantity: number;
  currentHumans: number;
  trainUnit: (quantity: number, unit: string) => void;
}
export default function UnitTrainingRow({
  unit,
  cost,
  quantity,
  currentHumans,
  trainUnit,
}: UnitTrainingRowProps) {
  return (
    <div className="academy__unit" key={`${unit}-div`}>
      <div className="flex-row">
        <div
          className="academy__icons__container academy__icons__container--row"
          key={`${unit}-iconContainer`}
        >
          <UnitIcon unit={unit} quantity={quantity} row />
        </div>
        <h3 key={`${unit}-title`}>
          {unit} ({cost} human{cost > 1 && "s"})
        </h3>
      </div>
      <div className="academy__unit__buttons">
        <Button
          key={`${unit}-btn1`}
          active={cost <= currentHumans}
          label={`Train 1 ${unit}`}
          onClick={() => trainUnit(1, unit)}
        />
        <Button
          key={`${unit}-btn5`}
          active={cost * 5 <= currentHumans}
          label={`Train 5 ${unit}`}
          onClick={() => trainUnit(5, unit)}
        />
      </div>
    </div>
  );
}
