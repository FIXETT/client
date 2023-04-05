import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Aside from '../components/aside';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import AddAsset from '../pages/AddAsset';
import ModifyAsset from '../pages/ModifyAsset';
import ConfirmPage from '../pages/ConfirmPage';
import FixPage from '../pages/FixPage';
import SignupPage from '../pages/SignupPage';
import EnterInfoPage from '../pages/EnterInfoPage';
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addasset" element={<AddAsset />} />
            <Route path="/modifyasset" element={<ModifyAsset />} />
            <Route path="/fix" element={<FixPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default Router;
