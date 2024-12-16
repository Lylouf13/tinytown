import { UNIT_TALENTS } from "enums/UnitTalents";
import TalentNode from "../talentNode/TalentNode";
import TalentLink from "../talentLink/TalentLink";

import './talentTree.scss'

interface TalentTreeProps {
  talents: UNIT_TALENTS[];
  talentPerRow: number[];
}

export default function TalentTree({ talents, talentPerRow }: TalentTreeProps) {
  var rows: { [key: string]: UNIT_TALENTS[] } = {};
  var linkers : string[] = []

  let talentIndex = 0;

  for (let currentRow = 0; currentRow < talentPerRow.length; currentRow++) {
    const rowKey = `${currentRow}`;
    

    if (!rows[rowKey]) {
      rows[rowKey] = [];
      
    }

    for (let i = 0; i < talentPerRow[currentRow]; i++) {
      if (talentIndex < talents.length) { 
        rows[rowKey].push(talents[talentIndex]);
        talentIndex++;
      } else {
        break;
      }
    }
  }

  for (let i = 0; i < talentPerRow.length; i++) {
    if(talentPerRow[i+1]) 
    linkers.push(`${talentPerRow[i]}for${talentPerRow[i+1]}`);
  }

  console.log(linkers)
  return (
    <div className="talentTree">
      {Object.keys(rows).map((row: string) => (
        <div className="talentTree__container" key = {`talentRow-${row}`}>
          <div className="talentTree__row" key={`talentRow-${row}`}>
            {rows[row].map((talent) => (
              <TalentNode key={`talentTree-${talent}`} talent={talent} />
            ))}
          </div>
          {Number(row) < linkers.length && <TalentLink key={`talentTree-Link${row}`} type={linkers[Number(row)]} />}
        </div>
      ))}
    </div>
  );
}
