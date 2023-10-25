import { ChampionData, marriedPartnerStatus } from './recoil/champion';
const ExList = () : JSX.Element => {
  const marriedPartnerData : ChampionData | any = marriedPartnerStatus;
  return (<>
  <div>전여친 목록</div>
  {marriedPartnerData?.id}
  </>)
};
export default ExList;