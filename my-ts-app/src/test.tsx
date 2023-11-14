import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChampionData } from './recoil/champion';
const Test = () : JSX.Element => {
  const { selectedValue } : any = useParams();
  console.log(selectedValue);
  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    // props숫자로 변환
    const numChampions = parseInt(selectedValue, 10);
    // 이상형 월드컵 토너먼트 라운드만큼 데이터 추출
    const randomChampions = Array.from({ length: numChampions }, () => {
      return championsArray[Math.floor(Math.random() * championsArray.length)];
    });
    return randomChampions;
  };
  // 챔피언 정보 가져오는 함수
  useEffect(()=> {
    // 함수를 한번 실행시키기 위한 변수
    let isMounted = true;
    // 챔피언 정보 가져오는 함수
    async function findPartner() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
        if (isMounted) {
          const allChampionData = response.data;
          const randomChampionData : ChampionData | any = getRandomChampion(allChampionData);
          console.log('테스트');
          console.log(randomChampionData);
        }
      } catch (error) {
        console.log('챔피언 데이터 가져오기 실패', error);
      }
    }
    findPartner();
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (<>
  <p>테스트 페이지</p>
  </>)
}
export default Test;