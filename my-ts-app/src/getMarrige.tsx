import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { maritalStatus, partnerImgValue, useSetMarriage, useSetPartnerImg, useSetPartnerState, useSetuserPartner, userPartnerStatus, userPatnerValue } from "./recoil/champion";

interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  // 다른 챔피언 데이터 속성 추가
}

const GetMarrige = (): JSX.Element => {
  // 파트너 상태 관리
  const [isPaired, setPaired] = useRecoilState(userPartnerStatus);
  // 파트너 상태 관리 함수
  const setpairing = useSetuserPartner();
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

  // 랜덤 챔피언 정보 받아오는 함수
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
      const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`, { responseType: "blob" })
    const reader = new FileReader();
    reader.readAsDataURL(response.data);
    reader.onload = () => {
      // 이미지 데이터를 Base64로 변환하여 저장
      setPartnerImg(reader.result);
    };
    // atom 확인
    // console.log(userPartnerImg);
  }
    catch (error) {
      console.log('이미지 가져오기 실패', error);
    }
  }
  // 다른 파트너 찾는 함수
  function cancelDate() {
    // 여기에 빠꾸하는 로직을 추가
    console.log("Atom에 저장된 파트너 데이터:", userPartnerData);
    try {
      // 파트너 없는 상태
      setpairing(false);
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
      const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/champion.json');
      // API에서 받아온 챔피언 데이터
      const partnerData = response.data;
      // 랜덤 챔피언 선택
      const randomChampionData : ChampionData | any = getRandomChampion(partnerData);
      // 파트너 데이터 업데이트
      setPartnerState(randomChampionData);
      console.log('최초에 받아온 랜덤 챔피언 데이터', randomChampionData);
      // 파트너가 있는 상태
      setpairing(true);
  
      // 챔피언 id로 이미지 데이터 받아오는 함수 실행
      if (randomChampionData) {
        console.log('이 상대는 어떠신가요?', randomChampionData);
        // 여기서 getPartnerImg를 호출하도록 변경
        getPartnerImg(randomChampionData.id);
        console.log(typeof randomChampionData.id);
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
    {userPartnerData ? (<>
      <h4>{userPartnerData.title}</h4>
      <h2>{userPartnerData.name}</h2>
      <p>{userPartnerData.blurb}</p>
    </>) : (<p>챔피언 정보 기다리는 중...</p>)}
        <img
          src={userPartnerImg}
          alt="파트너 이미지"
          width="300"
          height="400"
        />
      
      <button onClick={marryMe}>결혼해주세요</button>
      <button onClick={cancelDate}>당신은 내 스타일이 아녜요</button>
    </div>
  );
};

export default GetMarrige;
