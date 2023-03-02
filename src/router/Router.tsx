import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LadingPage from '../pages/Lading/LadingPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LadingPage />} />
    </Routes>
  );
}
export default Router;
