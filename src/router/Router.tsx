import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Aside from '../components/aside';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/Landing/LandingPage';
import AddAsset from '../pages/AddAsset';
import ModifyAsset from '../pages/ModifyAsset';
import ConfirmPage from '../pages/Signup/ConfirmPage';
import SignupPage from '../pages/Signup/SignupPage';
import EnterInfoPage from './../pages/Signup/EnterInfoPage';
import FixPage from '../pages/Fix/FixPage';
import AssetList from '../pages/AssetList';

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/enter" element={<EnterInfoPage />} />
        <Route element={<Layout />}>
          <Route element={<Aside />}>
            <Route path="/assetlist" element={<AssetList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fix" element={<FixPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default Router;
