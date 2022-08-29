import React, { FC } from 'react';
import Parser from 'html-react-parser';
import SETTINGS from '../../utils/settings';
import '../cardWithWord/cardWord.scss';
import DifficultWordButton from '../cardWithWord/cardButtons/difficultWordButton';
import LearnedWordButton from '../cardWithWord/cardButtons/learnedWordButton';
import SoundWordButton from '../cardWithWord/cardButtons/soundWordButton';
import useUpdateUserWord from '~/hooks/useUpdateUserWord';
import { IAggregated } from '~/models/IAggregated';

interface HardWordCardProps {
  word: IAggregated;
}

const HardWordCard: FC<HardWordCardProps> = ({ word }) => {
  const { updateWord, updateWordDifficulty } = useUpdateUserWord();
  return (
    <div className="card">
      <img className="card__image" src={`${SETTINGS.BASE_URL}/${word.image}`} alt={word.word} />
      <div className="card__sound__flex">
        <div className="card__word__wrapper">
          <div className={`card__word card__bgcolor${word.group}`}>
            {`${
              word.word[0].toUpperCase() + word.word.slice(1)
            } ${word.transcription}`}
          </div>
          <div className="card__translation">{word.wordTranslate}</div>
        </div>
        <SoundWordButton
          className={`_icon-volum card__sound card__color${word.group}`}
          audio={word.audio}
          audioMeaning={word.audioMeaning}
          audioExample={word.audioExample}
        />
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
      <div className="card__buttons">
        <div className={`card__progress__block card__color${word.group}`}>
          <span>Progress: </span>
          <span>{word.userWord.optional?.success}</span>
          <span>/</span>
          <span>{word.userWord.optional?.allAttemts}</span>
        </div>
        <div className="card__buttons__block">
          <DifficultWordButton
            classString={word.userWord.difficulty === SETTINGS.HARD_WORD ? `card__color${word.group}` : ''}
            onClick={() => (word.userWord.difficulty === SETTINGS.HARD_WORD
              ? updateWordDifficulty(word, { difficulty: SETTINGS.NORMAL_WORD })
              : updateWordDifficulty(word, { difficulty: SETTINGS.HARD_WORD }))}
          />
          <LearnedWordButton
            classString={word.userWord.optional?.learned === true ? 'card__button__learned-active' : ''}
            onClick={() => (word.userWord.optional?.learned === true
              ? updateWord(word, { learned: false })
              : updateWord(word, { learned: true }))}
          />
        </div>
      </div>
    </div>
  );
};

export default HardWordCard;
