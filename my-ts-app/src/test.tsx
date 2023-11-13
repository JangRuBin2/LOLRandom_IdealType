import axios from "axios";
import React, { useEffect } from "react";
import { ChampionData } from './recoil/champion';
type TestProps = {
  props: string;
};
const Test : React.FC<TestProps> = ({props}) : JSX.Element => {
  // async function getPartnerImg(name : string) {
  //   try {
  //     const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`, { responseType: "blob" });
  //     const reader = new FileReader();
  //     reader.readAsDataURL(response.data);
  //     reader.onload = () => {
  //     // 이미지 데이터를 Base64로 변환하여 저장
  //     // setPartnerImg(reader.result);
  //     }}
  //   catch (error) {
  //     console.log('이미지 가져오기 실패', error);
  //   }
  // };
  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    // props숫자로 변환
    const numChampions = parseInt(props, 10);
    // 이상형 월드컵 토너먼트 라운드만큼 데이터 추출
    const randomChampions = Array.from({ length: numChampions }, () => {
      return championsArray[Math.floor(Math.random() * championsArray.length)];
    });
    return randomChampions;
  };
    async function findPartner() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
        // API에서 받아온 챔피언 데이터
        const allChampionData = response.data;
        // 랜덤 챔피언 선택
        const randomChampionData : ChampionData | any = getRandomChampion(allChampionData);
        console.log(randomChampionData);
      } catch (error) {
        console.log('결혼 상대 매칭 실패', error);
      }
    }
    useEffect(()=> {
      findPartner();
    }, []);
  
  return (<>
  <p>{props}</p>
  </>)
}
export default Test;