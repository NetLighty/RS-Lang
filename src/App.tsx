import React, { useEffect } from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import MainPage from './pages/main/main';
import Menu from './components/menu/menu';
import StatisticPage from './pages/statistic/statistic';
import Logo from './components/logo/logo';
import Team from './pages/team/team';
import Book from './pages/book/book';
import MiniGames from './pages/miniGames/miniGames';
import AudioLevel from './pages/gameLevel/gameLevel';
import AudioCall from './pages/audioCall/audioCall';
import AudioResult from './pages/gameResult/gameResult';
import HardWords from './pages/hardWords/hardWords';
import RegistrationPage from './pages/authPages/registration';
import LoginPage from './pages/authPages/login';
import useActions from './hooks/useAction';
import { localStorageNames } from './utils/auth';
import UserService from './api/userService';
import { IUser } from './models/IUser';
import useTypedSelector from './hooks/useTypedSelector';
import { logoutUser } from './api/controllers/userController';

const App = () => {
  const { setUser, setIsAuth } = useActions();
  const { isAuth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem(localStorageNames.isAuth) && !isAuth) {
      const userInit = async (id: string): Promise<AxiosResponse<IUser>> => {
        const res = await UserService.getUser(id);
        return res;
      };
      const userId = localStorage.getItem(localStorageNames.userId);
      const accessToken = localStorage.getItem(localStorageNames.accesToken);
      if (userId && accessToken) {
        userInit(userId).then((res) => {
          // document.cookie = `token=${res.data.token}; secure; sameSite=strict`;
          setUser({ id: userId, name: res.data.name });
          setIsAuth(true);
        }).catch(() => { logoutUser(); });
      }
    }
  });
  return (
    <BrowserRouter>
      <Menu />
      <Logo />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/book" element={<Book />} />
        <Route path="/hardwords" element={<HardWords />} />
        <Route path="/games" element={<MiniGames />} />
        <Route path="/audiocall" element={<AudioLevel gameName="audio" to="/audiocall/game" />} />
        <Route path="/audiocall/game" element={<AudioCall />} />
        <Route path="/audiocall/result" element={<AudioResult nameResult="audiores" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
