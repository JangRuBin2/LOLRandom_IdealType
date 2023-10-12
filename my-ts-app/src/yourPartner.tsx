import { useEffect } from "react"
import { userPatnerValue, maritalStatus, exPatnerValue, useSetexPatnerValue, useSetPartnerState, useSetMarriage} from "./atom/champion"
import { useRecoilValue } from "recoil"
const YourPartner = () : JSX.Element => {
  function marryMe() {
  };
  function findAnotherPartner () {

  };

  return (<div><button onClick={marryMe}>결혼 해줘</button>
  <button onClick={findAnotherPartner}>넌 내 스타일이 아냐</button>
  </div>)
}
export default YourPartner;