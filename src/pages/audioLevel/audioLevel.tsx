/* eslint-disable react/jsx-no-bind */
import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LevelButton from '../../ui/levelButton/levelButton';
import './audioLevel.scss';

// eslint-disable-next-line react/function-component-definition
const AudioLevel: FC = () => {
  const [choose, setChoose] = useState(false);
  function chooseLevel(e: React.SyntheticEvent) {
    const levels = [...document.querySelectorAll('.level-button')];
    levels.map((item: Element) => item.classList.remove('active'));
    const target = e.target as HTMLInputElement;
    target.classList.add('active');
    localStorage.audiolevel = target.textContent;
    setChoose(true);
  }
  function sound(path: string) {
    const audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
  }
  return (
    <div className="audiolevel">
      <NavLink className="audiolevel__close _icon-close" to="/" />
      <div className="audiolevel__container">
        <p className="audiolevel__header">Аудиовызов</p>
        <p className="audiolevel__text">Давай выберем уровень</p>
        <div className="audiolevel__button" onClick={(e) => { chooseLevel(e); sound('https://zvukipro.com/uploads/files/2019-09/1567587229_8af5b2bf5d19c00.mp3'); }} role="button" tabIndex={0} onKeyDown={() => { }}>
          <LevelButton addClass="first-level" text="1" />
          <LevelButton addClass="second-level" text="2" />
          <LevelButton addClass="third-level" text="3" />
          <LevelButton addClass="fourth-level" text="4" />
          <LevelButton addClass="fifth-level" text="5" />
          <LevelButton addClass="sixth-level" text="6" />
        </div>
        <NavLink className={`audiolevel__start ${choose ? 'active-btn' : ''}`} to="/audiocall/game">вперёд</NavLink>
      </div>
    </div>
  );
};

export default AudioLevel;
