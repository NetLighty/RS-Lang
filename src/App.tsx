import React from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/main';
import Menu from './components/menu/menu';
import StatisticPage from './pages/statistic/statistic';
import Logo from './components/logo/logo';
import Team from './pages/team/team';
import MiniGames from './pages/miniGames/miniGames';
import AudioLevel from './pages/audioLevel/audioLevel';
import AudioCall from './pages/audioCall/audioCall';

// eslint-disable-next-line react/function-component-definition
const App = () => (
  <BrowserRouter>
    <Menu />
    <Logo />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/statistic" element={<StatisticPage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/games" element={<MiniGames />} />
      <Route path="/audiocall" element={<AudioLevel />} />
      <Route path="/audiocall/game" element={<AudioCall />} />
    </Routes>
  </BrowserRouter>
);

export default App;
