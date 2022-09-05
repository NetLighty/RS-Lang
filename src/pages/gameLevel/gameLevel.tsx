/* eslint-disable react/jsx-no-bind */
import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { sound } from '../../utils/subGameFunc';
import LevelButton from '../../ui/levelButton/levelButton';
import './gameLevel.scss';
import useActions from '~/hooks/useAction';

interface GameLevelProps {
  gameName: string;
  to?: string;
  difficultyLevel?: string,
}

const GameLevel: FC<GameLevelProps> = ({ gameName, to, difficultyLevel }) => {
  GameLevel.defaultProps = {
    to: undefined,
    difficultyLevel: undefined,
  };
  const [choose, setChoose] = useState(difficultyLevel);
  const { setSprintView } = useActions();

  useEffect(() => {
    if (gameName === 'Спринт') {
      setSprintView('start');
    }
    if (difficultyLevel) {
      const levels = [...document.querySelectorAll('.level-button')];
      levels.map((item: Element) => item.classList.add('disabled'));
      const choosenLevelButton = levels.find((levelButton) => levelButton.textContent === `${Number(difficultyLevel) + 1}`);
      if (choosenLevelButton) {
        choosenLevelButton.classList.remove('disabled');
        choosenLevelButton.classList.add('choosen');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (difficultyLevel?.length === 0) {
    if (localStorage.bookGroup) localStorage.removeItem('bookGroup');
    if (localStorage.bookPage) localStorage.removeItem('bookPage');
  }
  if (gameName === 'Аудиовызов') {
    if (localStorage.bookGroup) localStorage.removeItem('bookGroup');
    if (localStorage.bookPage) localStorage.removeItem('bookPage');
  }

  function chooseLevel(e: React.SyntheticEvent) {
    const levels = [...document.querySelectorAll('.level-button')];
    if (!difficultyLevel) {
      sound('https://zvukipro.com/uploads/files/2019-09/1567587229_8af5b2bf5d19c00.mp3');
      levels.map((item: Element) => item.classList.remove('active'));
      const target = e.target as HTMLInputElement;
      target.classList.add('active');
      if (gameName === 'Аудиовызов' && (target.textContent)) localStorage.audiolevel = (+(target.textContent) - 1) as unknown as string;
      else localStorage[`${gameName}level`] = target.textContent;
      setChoose(true);
    }
  }

  const goToGame = () => {
    if (gameName === 'Спринт') {
      setSprintView('game');
    }
  };

  return (
    <div className="gamelevel">
      <div className="gamelevel__container">
        <p className="gamelevel__header">
          <NavLink className="gamelevel__close _icon-close" to="/" />
          {gameName}
        </p>
        <p className="gamelevel__text">{difficultyLevel ? `Слова выбраны из учебника, уровень сложности: ${+difficultyLevel + 1}` : 'Уровень сложности:'}</p>
        <div className="gamelevel__button" onClick={(e) => { chooseLevel(e); }} role="button" tabIndex={0} onKeyDown={() => { }}>
          <LevelButton addClass="first-level" text="1" />
          <LevelButton addClass="second-level" text="2" />
          <LevelButton addClass="third-level" text="3" />
          <LevelButton addClass="fourth-level" text="4" />
          <LevelButton addClass="fifth-level" text="5" />
          <LevelButton addClass="sixth-level" text="6" />
        </div>
        <NavLink onClick={goToGame} className={`gamelevel__start ${choose ? 'active-btn' : ''}`} to={to || ''}>вперёд</NavLink>
      </div>
    </div>
  );
};

export default GameLevel;
