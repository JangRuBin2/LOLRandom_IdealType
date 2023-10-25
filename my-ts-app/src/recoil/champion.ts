import { atom, useSetRecoilState } from 'recoil';
// 챔피언 정보 인터페이스
export interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
}
// 결혼 상태
export const maritalStatus = atom({
  key: 'maritalStatus',
  default: false, // 비혼 상태
});
// 결혼 상태 관리 함수
export function useSetMarriage() {
  return useSetRecoilState(maritalStatus);
}
// 결혼한 상대의 정보
export const marriedPartnerStatus = atom<ChampionData[] | null |unknown>({
  key : 'marriedPartnerStatus',
  default : []
})
// 결혼한 상대 정보 업데이트
export function useSetmarriedPartner() {
  const setMarriedPartner = useSetRecoilState(marriedPartnerStatus);

  // 이 함수를 호출할 때 파트너 정보를 전달하도록 변경
  return (partner: ChampionData) => {
    setMarriedPartner((prevMarriedPartners: ChampionData[] | null | any) => [...prevMarriedPartners, partner]);
  };
}

// 현재 파트너의 정보
export const userPatnerValue = atom<ChampionData | null | unknown | any>({
  key: 'userPatnerValue',
  default: null,
});
// 파트너 정보 상태 갱신 함수
export function useSetPartnerState() {
  return useSetRecoilState(userPatnerValue);
}
// 파트너 이미지
export const partnerImgValue = atom<ChampionData | null |unknown>({
  key : 'partnerImgValue',
  default : null
})
// 이미지 정보 업데이트
export function useSetPartnerImg() {
  return useSetRecoilState(partnerImgValue);
}