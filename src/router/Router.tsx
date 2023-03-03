import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LadingPage from '../pages/Lading/LadingPage';
import SignupPage from '../pages/Signup/SignupPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LadingPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
export default Router;
