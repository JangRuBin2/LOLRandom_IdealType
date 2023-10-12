import { atom } from 'recoil';

export const userPartner = atom({
  key: 'userPartner', // 고유 키 (일반적으로 문자열)
  default: null, // 초기 상태
});
