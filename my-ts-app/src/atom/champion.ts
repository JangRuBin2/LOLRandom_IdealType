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
// 챔피언 정보 인터페이스
interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
}
// 현재 파트너의 정보
export const userPatnerValue = atom<ChampionData | null | unknown>({
  key: 'userPatnerValue',
  default: null,
});
// 파트너 정보 상태 갱신 함수
export function useSetPartnerState() {
  return useSetRecoilState(userPatnerValue);
}
// 내가 깐 bitches 목록
export const exPatnerValue = atom<ChampionData | any>({
  key: 'exPatnerValue',
  default: null,
});
// 내가 깐 bitches 정보 갱신
export function useSetexPatnerValue() {
  return useSetRecoilState(exPatnerValue);
}