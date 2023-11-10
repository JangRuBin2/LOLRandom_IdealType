import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChampionData, marriedPartnerStatus } from './recoil/champion';

const ExList = (): JSX.Element => {
  const marriedPartnerData: ChampionData[] | unknown | any = useRecoilValue(marriedPartnerStatus);
  const [imageArray, setImageArray] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = marriedPartnerData.map(async (item : any) => {
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
  }, [marriedPartnerData]);

  const exGirlFriend = marriedPartnerData.map((item: ChampionData, index: number) => (
    <div key={index}>
      {imageArray[index] && <img src={imageArray[index]} alt="" />}
      <h4>{item.title}</h4>
      <h2>{item.name}</h2>
      <p>{item.blurb}</p>
    </div>
  ));

  return (
    <>
      <div>전여친 목록 {exGirlFriend}</div>
    </>
  );
};

export default ExList;
