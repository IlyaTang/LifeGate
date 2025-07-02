import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import GamePage from './pages/GamePage';
import BattlePage from './pages/BattlePage';

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/create" replace />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/battle" element={<BattlePage />} />
    </Routes>
  );
}
