import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import GlobalStyle from './styles/globalstyle';
import { hotjar } from 'react-hotjar';
import TagManager from 'react-gtm-module';
function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      hotjar.initialize(3403053, 6);
    }
  }, []);

  const tagManagerArgs = {
    gtmId: 'UA-260316176-6',
  };

  TagManager.initialize(tagManagerArgs);

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
