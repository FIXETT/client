import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Aside from '../components/aside';
import Dashboard from '../pages/dashboard';
import Layout from '../components/Layout';
import AddSupply from '../pages/addsupply';
import LadingPage from '../pages/Lading/LadingPage';
import ConfirmPage from '../pages/Signup/ConfirmPage';
import SignupPage from '../pages/Signup/SignupPage';
import EnterInfoPage from './../pages/Signup/EnterInfoPage';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/enter" element={<EnterInfoPage />} />
      </Routes>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Aside />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addasset" element={<AddSupply />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default Router;
