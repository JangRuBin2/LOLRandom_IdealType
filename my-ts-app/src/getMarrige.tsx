import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { maritalStatus, useSetMarriage, useSetPartnerState, userPatnerValue } from "./atom/champion";

interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  // 다른 챔피언 데이터 속성 추가
}

const GetMarrige = (): JSX.Element => {
  const [isMarried, setMarried] = useRecoilState(maritalStatus);
  const setMarriage = useSetMarriage();
  const setPartnerState = useSetPartnerState();
  const partnerData: ChampionData | any = useRecoilValue(userPatnerValue);

  function getRandomChampion(championData: any) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    const randomChampion = championsArray[Math.floor(Math.random() * championsArray.length)];
    return randomChampion;
  }
  
  // 결혼 함수
  function marryMe() {
    setMarriage(true);
  }
  
  // 빠꾸 함수
  function cancelDate() {
    // 여기에 빠꾸하는 로직을 추가
    console.log("Atom에 저장된 파트너 데이터:", partnerData);
  }

  // 소개팅 함수
  function findPartner() {
    try {
      axios
        .get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json')
        .then((response) => {
          const partnerData = response.data; // API에서 받아온 챔피언 데이터

          // 랜덤 챔피언 선택
          const randomChampion = getRandomChampion(partnerData);

          // Recoil Atom 업데이트
          setPartnerState(randomChampion);

          // 결혼 상태를 true로 업데이트
          setMarriage(true);

          console.log('이 상대는 어떠신가요?', randomChampion);
          setPartnerState(randomChampion);
        });
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  }
  
  if (!isMarried) {
    return (
      <>
        <button onClick={findPartner}>결혼 상대 찾기</button>
      </>
    );
  }
  
  return (
    <div>
      <h2>당신의 파트너 : {partnerData.name}</h2>
      <button onClick={marryMe}>결혼해주세요</button>
      <button onClick={cancelDate}>당신은 내 스타일이 아녜요</button>
    </div>
  );
};

export default GetMarrige;
