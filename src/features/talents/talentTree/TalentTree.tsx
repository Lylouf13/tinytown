import { UNIT_TALENTS } from "enums/UnitTalents";
import TalentNode from "../talentNode/TalentNode";
import TalentLink from "../talentLink/TalentLink";

import './talentTree.scss'

interface TalentTreeProps {
  talents: { [key: string]: UNIT_TALENTS[] };
}

export default function TalentTree({ talents }: TalentTreeProps) {

  // stores necessary linkers between rows of talents to generate lines automatically
  const linkers: string[] = [];
  for (var i =0; i < Object.keys(talents).length-1; i++) {
    linkers.push(`${talents[i].length.toString()}for${talents[i+1].length.toString()}`)
  }

  return (
    <div className="talentTree">
      {Object.keys(talents).map((row: string) => (
        <div className="talentTree__container" key = {`talentRow-${row}`}>
          <div className="talentTree__row" key={`talentRow-${row}`}>
            {talents[row].map((talent) => (
              <TalentNode key={`talentTree-${talent}`} talent={talent} />
            ))}
          </div>
          {Number(row) < linkers.length && <TalentLink key={`talentTree-Link${row}`} type={linkers[Number(row)]} />}
        </div>
      ))}
    </div>
  );
}
