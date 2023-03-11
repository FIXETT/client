import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
<<<<<<< HEAD
import GlobalStyle from './styles/glogalstyle';
=======
import GlobalStyle from './styles/globalstyle';
>>>>>>> 1947f91c5e11a608feb0dc9e6431835efc978592

function App() {
  const queryClient = new QueryClient();
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
