import { atom, useSetRecoilState } from 'recoil';
// 결혼 상태
export const maritalStatus = atom({
  key: 'maritalStatus',
  default: false, // 비혼 상태
});
// 결혼 상태 관리 함수
export function useSetMarriage() {
  return useSetRecoilState(maritalStatus);
}
// 와이프 정보
interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  // 기타 챔피언 데이터 속성
}

export const userPatnerValue = atom<ChampionData | null | unknown>({
  key: 'userPatnerValue',
  default: null,
});
// 와이프 정보 상태 갱신 함수
export function useSetPartnerState() {
  return useSetRecoilState(userPatnerValue);
}
// 내가 깐 챔피언 목록
export const exPatnerValue = atom<string | null>({
  key: 'exPatnerValue',
  default: null,
});
// 내가 깐 챔피언 정보
export function useSetexPatnerValue() {
  return useSetRecoilState(exPatnerValue);
}