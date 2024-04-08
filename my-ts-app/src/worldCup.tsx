import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChampionData } from './recoil/champion';

type selectedRoundround = {
  round: string;
};

const WorldCup: React.FC<selectedRoundround> = ({ round }): JSX.Element => {
  // 토너먼트를 진행할 챔피언 정보 저장
  const [worldCupMembers, setWorldCupMembers] = useState<ChampionData[]>([]);
  // 승리한 챔피언
  const [winMembers, setWinMembers] = useState<ChampionData[]>([]);
  // 토너먼트 매치 state
  const [currentMatch, setCurrentMatch] = useState<number>(0);
  // 현재 매치 현황 state
  const [matchRound, setMatchRound] = useState<any>(round + "강");
  // 이미지 정보 저장
  const [imageArray, setImageArray] = useState<(string | undefined)[]>([]);
  

  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); 
    const numChampions = parseInt(round, 10);
    // 이상형 월드컵 토너먼트 라운드만큼 데이터 추출
    const randomChampions = Array.from({ length: numChampions }, () => {
      return championsArray[Math.floor(Math.random() * championsArray.length)];
    });
    return randomChampions;
  };

  // 챔피언 정보 가져오는 함수
  useEffect(() => {
    const findPartner = async () => {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
        const allChampionData = response.data;
        const randomChampionData: any = await getRandomChampion(allChampionData);
        setWorldCupMembers(randomChampionData);
      } catch (error) {
        console.log('챔피언 데이터 가져오기 실패', error);
      }
    };
    findPartner();
  }, []);

  // 둘 다 선택하기 싫을 때
  const chooseNone = () => {
    setCurrentMatch((prevMatch) => prevMatch + 1);
  };

  const championSelect = (champion: ChampionData): void => {
    // 선택한 챔피언 마지막 배열에 넣음
    setWinMembers((prevSelectedChampions) => [...prevSelectedChampions, champion]);
    setCurrentMatch((prevMatch) => prevMatch + 1);
  };

  // 매칭 된 상대를 랜더링하는 컴포넌트
  const renderMatchups = () => {
    const matchups: JSX.Element[] = [];

    for (let i = currentMatch * 2; i < worldCupMembers.length && i < (currentMatch + 1) * 2; i += 2) {
      const champion1 = worldCupMembers[i];
      const champion2 = worldCupMembers[i + 1];
      matchups.push(
        <div key={`matchup-${i}`}>
          <div onClick={() => championSelect(champion1)}>
            {imageArray[i] && <img style={{width : "200px", height:"200px"}} src={imageArray[i]} alt="챔피언 이미지" />}
            <h2>{champion1.id}</h2>
          </div>
          VS
          <div onClick={() => championSelect(champion2)}>
            {imageArray[i + 1] && <img style={{width : "200px", height:"200px"}} src={imageArray[i + 1]} alt="챔피언 이미지" />}
            <h2>{champion2.id}</h2>
          </div>
        </div>
      );
    }
    if (currentMatch * 2 === worldCupMembers.length) {
      console.log("winMembers.length : ",winMembers.length);
      console.log("parseInt(round, 10) / 2 : ",parseInt(round, 10) / 2);
      if (winMembers.length === parseInt(round, 10) / 2) {
        setWorldCupMembers(winMembers);
        setWinMembers([]);
        setCurrentMatch(0);
        console.log(winMembers.length);
        if(winMembers.length != 2 ) {
          console.log("winMembers.length : ", winMembers.length );
          setMatchRound((preventMatchRound : any)=> (parseInt(preventMatchRound) / 2) + "강");
        } else {
          setMatchRound("결승전");
          // 결승전을 나타내는 타이밍, 8, 4, 결승 조건문 수정 필요
        }
      } else {
        return finalWinner();
        // 토너먼트가 완전히 종료된 경우, 여기에 추가 로직을 넣을 수 있습니다.
      }
      console.log('경기 끝');
    }
    return matchups;
  };

  // 챔피언 이미지 불러오는 함수
  useEffect(() => {
    const fetchImages = async () => {
      const promises = worldCupMembers.map(async (item: any) => {
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

  const finalWinner = (): JSX.Element => {
    if (!winMembers || winMembers.length === 0 || !winMembers[0]) {
      return <>잘못된 접근</>;
    }
  
    return (
      <div>
        <img src={imageArray && imageArray.length > 0 ? imageArray[0] : ''} alt="챔피언 이름" />
        {winMembers[0]['name']}
      </div>
    );
  };
  return (
    <>
      <h2>{matchRound}</h2>
      {renderMatchups()}
      
      {currentMatch < worldCupMembers.length / 2 && (
        <button onClick={chooseNone}>기권</button>
      )}
    </>
  );
};

export default WorldCup;
