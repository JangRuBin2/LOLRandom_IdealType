import axios from "axios";
import { useSetPartnerState, useSetMarriage } from "./atom/champion";
import { useEffect } from "react";

const GetMarrige = (): JSX.Element => {
  const setPartnerState = useSetPartnerState();
  const setMarriage = useSetMarriage();

  function getRandomChampion(championData : any) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    const randomChampion = championsArray[Math.floor(Math.random() * championsArray.length)];
    return randomChampion;
  }

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
        });
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  }

  return <button onClick={findPartner}>결혼 상대 찾기</button>;
};

export default GetMarrige;
