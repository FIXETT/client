import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Aside from '../components/aside';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';

import ConfirmPage from '../pages/ConfirmPage';
import FixPage from '../pages/FixPage';
import SignupPage from '../pages/SignupPage';
import EnterInfoPage from '../pages/EnterInfoPage';
import AssetList from '../pages/AssetList';
import SearchList from '../pages/SearchList';
import MyPage from '../pages/MyPage';
import Landing from '../pages/Landing';
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/enter" element={<EnterInfoPage />} />
      <Route element={<Layout />}>
        <Route element={<Aside />}>
          <Route path="/assetlist" element={<AssetList />} />
          <Route path="/searchlist" element={<SearchList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fix" element={<FixPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default Router;
