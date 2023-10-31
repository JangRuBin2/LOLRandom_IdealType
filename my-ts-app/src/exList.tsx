import axios from 'axios';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChampionData, marriedPartnerStatus } from './recoil/champion';
const ExList = () : JSX.Element => {
  const [ champImg, setChampImg ] = useState<any | null>([]);
  // 챔피언 이미지 가져오는 함수
  async function getPartnerImg(name : string) {
    try {
      const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`, { responseType: "blob" });
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onload = () => {
      // 이미지 데이터를 Base64로 변환하여 저장
      setChampImg(reader.result);
      }}
    catch (error) {
      console.log('이미지 가져오기 실패', error);
    }
  };
  // 결혼했던 챔피언 데이터 atom
  const marriedPartnerData : ChampionData | any = useRecoilValue(marriedPartnerStatus);
  // atom으로 배열마다 태그 생성
  const exGirlFriend = marriedPartnerData.map((item : ChampionData | any | undefined, index : number)=> {
    // index id값으로 이미지 요청 함수 실행
    getPartnerImg(item.id);

    return (<div key={index}>
      {champImg ? (<img src={champImg} alt="챔피언 이미지" />) : (<p>챔피언 이미지 가져오는 중</p>) }
      
      <h4>{item.title}</h4>
      <h2>{item.name}</h2>
      <p>{item.blurb}</p>

    </div>)
  })
  return (<>
  <div>전여친 목록
  {exGirlFriend}
  </div>
  </>)
};
export default ExList;