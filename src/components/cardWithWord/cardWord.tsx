import React, { FC, useState } from 'react';
import SETTINGS from './../../utils/settings';
import { IWord } from '../../models/IWord';
import './cardWord.scss';
import DifficultWordButton from './cardButtons/difficultWordButton';
import LearnedWordButton from './cardButtons/learnedWordButton';

interface CardWordProps {
  word: IWord;
}


const CardWord:FC<CardWordProps> = ({ word }) => {
  const [isAuth] = useState(true);
  return (
  <div className="card">
    <img className="card__image" src={`${SETTINGS.BASE_URL}/${word.image}`} alt={word.word} />
    <div className="card__sound__flex">
      <div className="card__word__wrapper">
      <div className="card__word">{`${word.word[0].toUpperCase() + word.word.slice(1)} ${word.transcription}`}</div>
      <div className="card__translation">{word.wordTranslate}</div>
      </div>
      <button className="_icon-volum card__sound"></button>
    </div>
    <div className="card__meaning">
      <p className="card__meaning__text">значение</p>
      <p className="card__meaning__textMeaning">{word.textMeaning}</p>
      <p className="card__meaning__textMeaningTranslate">{word.textMeaningTranslate}</p>
    </div>
    <div className="card__example">
      <p className="card__example__text">применение</p>
      <p className="card__example__textExample">{word.textExample}</p>
      <p className="card__example__textExampleTranslate">{word.textExampleTranslate}</p>
    </div>
    {isAuth && <div className="card__buttons">
    <LearnedWordButton/>
    <DifficultWordButton/>
    </div>}
  </div>
  )
  };

export default CardWord;
