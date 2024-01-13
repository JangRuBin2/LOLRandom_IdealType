import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChampionData } from './recoil/champion';
type selectedRoundround = {
  round : string
};
const WorldCup : React.FC<selectedRoundround>= ({round}) : JSX.Element => {
  // 토너먼트를 진행할 챔피언 정보 저장
  const [worldCupMembers, setWorldCupMembes] = useState<ChampionData[]>([]);
  const [winMembers, setWinMembers] = useState<ChampionData[]>([]);
  // 토너먼트 라운드 state
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  // 이미지 정보 저장
  const [imageArray, setImageArray] = useState<(string | undefined)[]>([]);
  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    // round숫자로 변환
    const numChampions = parseInt(round, 10);
    // 이상형 월드컵 토너먼트 라운드만큼 데이터 추출
    const randomChampions = Array.from({ length: numChampions }, () => {
      return championsArray[Math.floor(Math.random() * championsArray.length)];
    });
    console.log('randomChampions : ', randomChampions);
    return randomChampions;
  };
   // 챔피언 정보 가져오는 함수
  async function findPartner() {
    try {
      const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
        const allChampionData = response.data;
        const randomChampionData : ChampionData | any = getRandomChampion(allChampionData);
        setWorldCupMembes(randomChampionData);
        console.log(randomChampionData);
    } catch (error) {
      console.log('챔피언 데이터 가져오기 실패', error);
    }}
  // 챔피언 정보 가져오는 함수
  useEffect(()=> {
    findPartner();
  }, [round]);
  // 둘 다 선택하기 싫을 때
  const chooseNone = () => {
    setCurrentMatch((prevMatch) => prevMatch + 1);
  };
  
  const championSelect = (champion: ChampionData) : void => {
    setWinMembers((prevSelectedChampions) => [...prevSelectedChampions, champion]);
    setCurrentMatch((prevMatch) => prevMatch + 1);
  };

// 매칭 된 상대를 랜더링하는 컴포넌트
  const renderMatchups = () => {
    const matchups: JSX.Element[] = [];

    for (let i = currentMatch * 2; i < worldCupMembers.length && i < (currentMatch + 1) * 2; i += 2) {
      console.log('currentMatch : ', i);
      console.log('worldCupMembers.length : ', worldCupMembers.length);
      const champion1 = worldCupMembers[i];
      const champion2 = worldCupMembers[i + 1];
      matchups.push(
        <div key={`matchup-${i}`}>
          <div onClick={() => championSelect(champion1)}>
          {imageArray[i] && <img src={imageArray[i]} alt="챔피언 이미지"/>}
          <h2>{champion1.id}</h2>
          </div>
          VS
          <div onClick={() => championSelect(champion2)}>
          {imageArray[i+1] && <img src={imageArray[i+1]} alt="챔피언 이미지" />}
          <h2>{champion2.id}</h2>
          </div>
        </div>
      );
    }
    if (currentMatch * 2 >= worldCupMembers.length) {
      // 다른 페이지로 이동하는 함수 호출 또는 다른 로직을 추가하세요.
      console.log('경기 끝');
    }
    return matchups;
  };
// 챔피언 이미지 불러오는 함수
  useEffect(() => {
    const fetchImages = async () => {
      const promises = worldCupMembers.map(async (item : any) => {
        try {
          const response = await axios.get(
            `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item.id}_0.jpg`,
            { responseType: 'blob' }
          );
          const reader = new FileReader();
          reader.readAsDataURL(response.data);
          return new Promise<string>((resolve) => {
            reader.onload = () => {
              resolve(reader.result as string);
            };
          });
        } catch (error) {
          console.log('이미지 가져오기 실패', error);
          return undefined;
        }
      });

      const results = await Promise.all(promises);
      setImageArray(results);
    };
    fetchImages();
  }, [worldCupMembers]);
  
  return (<>
  <h2>{round}강</h2>
  {renderMatchups()}
  {currentMatch < worldCupMembers.length / 2 && (
        <button onClick={chooseNone}>기권</button>
      )}
  </>)
}
export default WorldCup;