import React, { FC } from 'react';
import Footer from '../../components/footer/footer';
import GameAudioAbout from '../../components/gameAudioAbout/gameAudioAbout';
import GameSprintAbout from '../../components/gameSprintAbout/gameSprintAbout';
import './miniGames.scss';

// eslint-disable-next-line react/function-component-definition
const MiniGames: FC = () => (
  <div className="games">
    <div className="games__header">Мини-игры</div>
    <div className="games__container">
      <GameSprintAbout />
      <GameAudioAbout />
    </div>
    <div className="games__footer">
      <Footer />
    </div>
  </div>
);

export default MiniGames;
