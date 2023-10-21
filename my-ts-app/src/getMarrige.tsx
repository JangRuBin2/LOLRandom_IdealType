import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { maritalStatus, partnerImgValue, useSetMarriage, useSetPartnerImg, useSetPartnerState, userPatnerValue } from "./recoil/champion";

interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  // 다른 챔피언 데이터 속성 추가
}

const GetMarrige = (): JSX.Element => {
  // 결혼 상태
  const [isMarried, setMarried] = useRecoilState(maritalStatus);
  // 결혼 상태 관리 함수
  const setMarriage = useSetMarriage();
  // 파트너 정보 갱신 함수
  const setPartnerState = useSetPartnerState();
  // 파트너 정보
  const userPartnerData: ChampionData | any = useRecoilValue(userPatnerValue);
  // 파트너 이미지
  const userPartnerImg : ChampionData | any = useRecoilValue(partnerImgValue);
  // 파트너 이미지 갱신 함수
  const setPartnerImg = useSetPartnerImg();
  // 이미지 로드 상태를 관리할 상태 추가
  const [imageLoaded, setImageLoaded] = useState(false);

  function getRandomChampion(championData: any | unknown) {
    const championsArray = Object.values(championData.data); // 챔피언 데이터 배열로 변환
    const randomChampion = championsArray[Math.floor(Math.random() * championsArray.length)];
    return randomChampion;
  }
  
  // 결혼 함수
  function marryMe() {
    setMarriage(true);
  }
  // 챔피언 이미지 찾기 함수
  async function getPartnerImg(name : string) {
    try {
      console.log('인자가 잘 들어오는지 확인',name);
      await axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`, { responseType: "blob" })
  .then(response => {
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onload = () => {
      // 이미지 데이터를 Base64로 변환하여 저장
      setPartnerImg(reader.result);
    };
    // atom 확인
    console.log(userPartnerImg);
  })}
    catch (error) {
      console.log('이미지 가져오기 실패', error);
    }
  }
  // 다른 파트너 찾는 함수
  function cancelDate() {
    // 여기에 빠꾸하는 로직을 추가
    console.log("Atom에 저장된 파트너 데이터:", userPartnerData);
    try {
    // 현재 파트너 정보 초기화
      setPartnerState(null);
      // 다시 챔피언 정보 받아옴
      findPartner();
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  }

  // 소개팅 함수
  async function findPartner() {
    try {
      await axios
        .get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json')
        .then((response) => {
          // API에서 받아온 챔피언 데이터
          const partnerData = response.data;
          // 랜덤 챔피언 선택
          const randomChampion = getRandomChampion(partnerData);
          // 파트너 데이터 업데이트
          setPartnerState(randomChampion);
          console.log('이 상대는 어떠신가요?', randomChampion);
          // 챔피언 이미지 데이터 받아오는 함수
          getPartnerImg(userPartnerData.id);
          console.log(typeof(userPartnerData.id));
        });
    } catch (error) {
      console.log('결혼 상대 매칭 실패', error);
    }
  }
  // 결혼 취소
  function divorce() {
    setMarried(false);
  }
  // 이미지 로드가 완료된 후 실행되는 효과
  useEffect(() => {
    if (userPartnerImg) {
      setImageLoaded(true);
      console.log('이미지 상태 업데이트', userPartnerImg);
    }
  }, [userPartnerImg]);
  // 결혼 상태의 태그
  if (isMarried) {
    return (<><p>{userPartnerData.name}와의 결혼을 축하합니다!</p>
    <button onClick={divorce}>파혼</button>
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
      <h4>{userPartnerData.title}</h4>
      <h2>{userPartnerData.name}</h2>
      <p>{userPartnerData.blurb}</p>
      {imageLoaded ? ( // 이미지가 로드된 후에만 이미지를 화면에 표시
        <img
          src={userPartnerImg}
          alt="파트너 이미지"
          width="100"
          height="100"
        />
      ) : (
        <p>이미지 로딩 중...</p>
      )}
      <button onClick={marryMe}>결혼해주세요</button>
      <button onClick={cancelDate}>당신은 내 스타일이 아녜요</button>
    </div>
  );
};

export default GetMarrige;
