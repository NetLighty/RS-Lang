import React, { FC } from 'react';
import DescriptionGame from '../descriptionGame/descriptionGames';
import './gameSprintAbout.scss';

const GameSprintAbout: FC = () => (
  <div className="games__sprint">
    <div className="games__sprint_boy" />
    <DescriptionGame
      name="Спринт"
      text="Игра проверит, знаешь ли ты перевод слов.
        Тебе будут даны слова на английском языке и вариант перевода. Нужно ответить, верный ли перевод."
      addText="Игра длится 1 минуту, как думаешь сколько слов ты успеешь ответить?"
      addClass="sprint"
      textButton="вперёд"
      path="/sprint"
      keys="стрелки ← влево, вправо →"
    />
  </div>
);

export default GameSprintAbout;
