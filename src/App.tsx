import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import GlobalStyle from './styles/globalstyle';
import { hotjar } from 'react-hotjar';
import ReactGA from 'react-ga';

function App() {
  const queryClient = new QueryClient();

  const pathName = window.location.pathname;
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-260316176-6');
      ReactGA.set({ page: pathName });
      ReactGA.pageview(pathName);
    }
  }, [pathName]);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      hotjar.initialize(3403053, 6);
    }
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
