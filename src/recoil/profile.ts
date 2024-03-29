import { atom } from 'recoil';

interface Profile {
  user: {
    agreePi: boolean;
    company: string;
    createdAt: string;
    email: string;
    identifier: number;
    job: null;
    name: string;
    password: string;
    phone: null;
    updatedAt: string;
    userId: number;
  };
}

const PROFILE_KEY = 'profile';

const useProfileState = atom({
  key: PROFILE_KEY,
  default: {} as Profile,
});

export { useProfileState };

export const companyState = atom({
  key: 'company',
  default: '',
});
export const nameState = atom({
  key: 'name',
  default: '',
});
