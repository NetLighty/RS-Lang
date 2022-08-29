import React, { FC } from 'react';
import DescriptionGame from '../descriptionGame/descriptionGames';
import './gameAudioAbout.scss';

const GameAudioAbout: FC = () => (
  <div className="games__audio">
    <div className="games__audio_girl" />
    <DescriptionGame
      name="Аудиовызов"
      text="Игра проверит, как ты воспринимаешь на слух английскую речь.
      Будет произнесено слово, а тебе нужно будет выбрать верный вариант перевода из 5 возможных."
      addText="Тебе надо будет перевести 10 слов, это же пустяки для тебя?"
      addClass="audio"
      textButton="играем"
      path="/audiocall"
      keys="1, 2, 3, 4, 5 и пробел"
    />
  </div>
);

export default GameAudioAbout;
