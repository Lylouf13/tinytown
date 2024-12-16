interface TalentLinkProps {
  type: string;
}
export default function talentLink({ type }: TalentLinkProps) {
  return (
    <img className="talentLink" src={`assets/treeLinks/talentLink_${type}.png`} alt="oneForTwo" />
  )
}
