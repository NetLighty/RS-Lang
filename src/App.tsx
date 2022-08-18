import React from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/main';
import Menu from './components/menu/menu';
import StatisticPage from './pages/statistic/statistic';
import Footer from './components/footer/footer';
import Logo from './components/logo/logo';
import Team from './pages/team/team';
import Book from './pages/book/book';

// eslint-disable-next-line react/function-component-definition
const App = () => (
  <BrowserRouter>
    <Menu />
    <Logo />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/statistic" element={<StatisticPage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/book" element={<Book />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
