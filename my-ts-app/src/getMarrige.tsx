import axios from "axios";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { ChampionData, maritalStatus, marriedPartnerStatus, partnerImgValue, useSetMarriage, useSetPartnerImg, useSetPartnerState, useSetmarriedPartner, userPatnerValue } from "./recoil/champion";
const GetMarrige = (): JSX.Element => {
  // 결혼 상태
  const [isMarried, setMarried] = useRecoilState(maritalStatus);
  // 결혼 상태 관리 함수
  const setMarriage = useSetMarriage();
  // 파트너 정보
  const userPartnerData: ChampionData | any = useRecoilValue(userPatnerValue);
  // 파트너 정보 갱신 함수
  const setPartnerState = useSetPartnerState();
  // 파트너 이미지
  const userPartnerImg : ChampionData | any = useRecoilValue(partnerImgValue);
  // 파트너 이미지 갱신 함수
  const setPartnerImg = useSetPartnerImg();
  // 결혼 파트너 데이터
  const marriedPartnerData : ChampionData | any = useRecoilValue(marriedPartnerStatus);
  const setmarriedPartnerData = useSetmarriedPartner();
  // 랜덤 챔피언 선택 함수
  // const setMarriedPartner = useSetmarriedPartner();
  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    const randomChampion = championsArray[Math.floor(Math.random() * championsArray.length)];
    return randomChampion;
  };
  
  // 결혼 함수
  function marryMe() {
  // 결혼한 배열에 데이터 할당
  setmarriedPartnerData(userPartnerData);
  // 결혼상태 true
  setMarriage(true);
  };
  useEffect(()=> {
    console.log(marriedPartnerData)
  }, [marriedPartnerData]);
  // 챔피언 이미지 찾기 함수
  async function getPartnerImg(name : string) {
    try {
      const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`, { responseType: "blob" });
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onload = () => {
      // 이미지 데이터를 Base64로 변환하여 저장
      setPartnerImg(reader.result);
      }}
    catch (error) {
      console.log('이미지 가져오기 실패', error);
    }
  };
  // 다른 파트너 찾는 함수
  function cancelDate() {
    // 여기에 빠꾸하는 로직을 추가
    try {
      // 현재 파트너 정보 초기화
      setPartnerState(null);
      // 로컬에서 모든 챔피언 데이터 가져옴
      const allChampionData : any = localStorage.getItem('allChampData');
      // 파싱
      const parsedData = JSON.parse(allChampionData);
      // 랜덤 챔피언 데이터 추출
      const randomChampionData : ChampionData | any = getRandomChampion(parsedData.data);
      // 파트너 데이터 업데이트
      setPartnerState(randomChampionData);
      // 챔피언 id로 이미지 데이터 받아오는 함수 실행
      if (randomChampionData) {
        getPartnerImg(randomChampionData.id);
      }
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  };

  // 소개팅 함수
  async function findPartner() {
    try {
      const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
      // 로컬에 저장
      localStorage.setItem('allChampData', JSON.stringify(response));
      // API에서 받아온 챔피언 데이터
      const allChampionData = response.data;
      // 랜덤 챔피언 선택
      const randomChampionData : ChampionData | any = getRandomChampion(allChampionData);
      // 파트너 데이터 업데이트
      setPartnerState(randomChampionData);
      // 챔피언 id로 이미지 데이터 받아오는 함수 실행
      if (randomChampionData) {
        getPartnerImg(randomChampionData.id);
      }
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  }
  
  // 결혼 취소
  function divorce() {
    setMarried(false);
  }
  // 결혼 상태일 때 태그
  if (isMarried) {
    return (<><p>{userPartnerData.name}와의 결혼을 축하합니다!</p>
    <div className="btn_box">
    <button onClick={divorce}>파혼</button>
    <Link to='/exList'>
    <button>테스트</button>
    </Link>
    </div>
    </>)
  }
  // 파트너 데이터가 없는 최초 접속시 태그
  if (!userPartnerData) {
    return (
      <>
        <button onClick={findPartner}>결혼 상대 찾기</button>
      </>
    );
  }
  return (
    <div>
      {userPartnerData ? (<>
      <div style={{display : "flex", flexDirection : "row", justifyContent : "center"}}>
      <h4>{userPartnerData.title}</h4>
      <h2>{userPartnerData.name}</h2>
      </div>
      <div style={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
        <img
          src={userPartnerImg}
          alt="파트너 이미지"
          width="300"
          height="400"
        />
        <div style={{
          fontSize : '15px', width : '80%'
        }}>
        <p>{userPartnerData.blurb}</p>
        </div>
        </div>
        </>) : (<p>정보 불러오는중...</p>)}
        <div className="btn_box">
      <button onClick={marryMe}>결혼</button>
      <button onClick={cancelDate}>다른 파트너 찾기</button>
        </div>
    </div>
  );
};

export default GetMarrige;
