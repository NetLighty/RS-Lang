import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { sound } from '../../utils/subGameFunc';
import LevelButton from '../../ui/levelButton/levelButton';
import '../gameLevel/gameLevel.scss';

interface GameLevelProps {
  gameName: string;
}

const SprintStart: FC<GameLevelProps> = ({ gameName }) => {
  const [choose, setChoose] = useState(false);
  if (localStorage.bookGroup) localStorage.removeItem('bookGroup');
  if (localStorage.bookPage) localStorage.removeItem('bookPage');
  function chooseLevel(e: React.SyntheticEvent) {
    const levels = [...document.querySelectorAll('.level-button')];
    levels.map((item: Element) => item.classList.remove('active'));
    const target = e.target as HTMLInputElement;
    target.classList.add('active');
    localStorage[`${gameName}level`] = target.textContent;
    setChoose(true);
  }

  return (
    <div className="gamelevel">
      <NavLink className="gamelevel__close _icon-close" to="/" />
      <div className="gamelevel__container">
        <p className="gamelevel__header">{gameName}</p>
        <p className="gamelevel__text">Уровень сложности:</p>
        <div className="gamelevel__button" onClick={(e) => { chooseLevel(e); sound('https://zvukipro.com/uploads/files/2019-09/1567587229_8af5b2bf5d19c00.mp3'); }} role="button" tabIndex={0} onKeyDown={() => { }}>
          <LevelButton addClass="first-level" text="1" />
          <LevelButton addClass="second-level" text="2" />
          <LevelButton addClass="third-level" text="3" />
          <LevelButton addClass="fourth-level" text="4" />
          <LevelButton addClass="fifth-level" text="5" />
          <LevelButton addClass="sixth-level" text="6" />
        </div>
        <button className={`gamelevel__start ${choose ? 'active-btn' : ''}`} type="button">вперёд</button>
      </div>
    </div>
  );
};

export default SprintStart;
