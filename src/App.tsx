import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import GlobalStyle from './styles/globalstyle';
import { hotjar } from 'react-hotjar';

function App() {
  const queryClient = new QueryClient();

  // if (true) {
  //   console.log = function no_console() {};
  //   console.warn = function no_console() {};
  // }

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
