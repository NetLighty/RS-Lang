import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './startGame.scss';

interface StartGameProps {
  text: string;
  path: string;
}

// eslint-disable-next-line react/function-component-definition
const StartGame: FC<StartGameProps> = ({ text, path }) => (
  <NavLink className="game-link" to={path}>
    <div className="game-link__container">
      <p className="game-link__text">{text}</p>
      <div className="game-link__arrow" />
    </div>
  </NavLink>
);

export default StartGame;
