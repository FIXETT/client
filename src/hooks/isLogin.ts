import { useEffect } from 'react';

const useAuth = () => {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요한 페이지 입니다. 로그인해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
  }, []);
};

export default useAuth;
