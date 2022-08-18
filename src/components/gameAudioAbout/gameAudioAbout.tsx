import React, { FC } from 'react';
import DescriptionGame from '../descriptionGame/descriptionGames';
import './gameAudioAbout.scss';

// eslint-disable-next-line react/function-component-definition
const GameAudioAbout: FC = () => (
  <div className="games__audio">
    <div className="games__audio_girl" />
    <DescriptionGame
      name="Аудиовызов"
      text="Игра проверит, как ты воспринимаешь на слух английскую речь.
      Будет произнесено слово, а тебе нужно будет выбрать верный вариант перевода из 5 возможных."
      addText="Тебе надо будет перевести 20 слов, это же пустяки для тебя?"
      addClass="audio"
      textButton="играем"
      path="/audioСall"
    />
  </div>
);

export default GameAudioAbout;
