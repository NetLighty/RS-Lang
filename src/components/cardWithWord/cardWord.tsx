import React, { FC, useState } from 'react';
import Parser from 'html-react-parser';
import SETTINGS from '../../utils/settings';
import { IWord } from '../../models/IWord';
import './cardWord.scss';
import DifficultWordButton from './cardButtons/difficultWordButton';
import LearnedWordButton from './cardButtons/learnedWordButton';
import SoundWordButton from './cardButtons/soundWordButton';
import useUpdateUserWord from '~/hooks/useUpdateUserWord';

interface CardWordProps {
  word: IWord;
}

const CardWord:FC<CardWordProps> = ({ word }) => {
  const [isAuth] = useState(true);
  const { updateWord, updateWordDifficulty } = useUpdateUserWord();

  return (
    <div className="card">
      <img className="card__image" src={`${SETTINGS.BASE_URL}/${word.image}`} alt={word.word} />
      <div className="card__sound__flex">
        <div className="card__word__wrapper">
          <div className={`card__word card__bgcolor${word.group}`}>{`${word.word[0].toUpperCase() + word.word.slice(1)} ${word.transcription}`}</div>
          <div className="card__translation">{word.wordTranslate}</div>
        </div>
        <SoundWordButton className={`_icon-volum card__sound card__color${word.group}`} audio={word.audio} audioMeaning={word.audioMeaning} audioExample={word.audioExample} />
      </div>
      <div className="card__meaning">
        <p className={`card__meaning__text card__color${word.group}`}>значение</p>
        <p className="card__meaning__textMeaning">{Parser(word.textMeaning)}</p>
        <p className="card__meaning__textMeaningTranslate">{word.textMeaningTranslate}</p>
      </div>
      <div className="card__example">
        <p className={`card__example__text card__color${word.group}`}>применение</p>
        <p className="card__example__textExample">{Parser(word.textExample)}</p>
        <p className="card__example__textExampleTranslate">{word.textExampleTranslate}</p>
      </div>
      {isAuth && (
      <div className="card__buttons">
        <div className={`card__progress__block card__color${word.group}`}>
          <span>Progress: </span>
          <span>2</span>
          <span>/</span>
          <span>3</span>
        </div>
        <div className="card__buttons__block">
          <DifficultWordButton
            onClick={() => updateWordDifficulty(word, { difficulty: SETTINGS.HARD_WORD })}
          />
          <LearnedWordButton
            onClick={() => updateWord(word, { game: 'sprint', dataupdate: (new Date()).toString() })}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default CardWord;
