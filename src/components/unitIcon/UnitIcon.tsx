import './unitIcon.scss';

interface UnitIconProps {
    unit : string,
    quantity : number
    row? : boolean
}
export default function UnitIcon( { unit, quantity, row } : UnitIconProps ) {
  return (
    <div className={row ? "unitIcon unitIcon--row" : `unitIcon`}>
        <caption className='unitIcon__caption'>{quantity}</caption>
        <img
        className={
            quantity > 0 ? "unitIcon__image" : "unitIcon__image unitIcon__image--inactive"
        }
        key={`${unit}-img`}
        src={`/assets/icons/units/${unit}_icon.png`}
        alt={`${unit}-icon`}
        />
    </div>

  );
}
