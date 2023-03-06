import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LadingPage from '../pages/Lading/LadingPage';
import ConfirmPage from '../pages/Signup/ConfirmPage';
import SignupPage from '../pages/Signup/SignupPage';
import EnterInfoPage from './../pages/Signup/EnterInfoPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LadingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/enter" element={<EnterInfoPage />} />
    </Routes>
  );
}
export default Router;
