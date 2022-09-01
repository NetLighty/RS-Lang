import React, { FC } from 'react';
import SETTINGS from '../../utils/settings';
import { IWord } from '../../models/IWord';
import './cardWord.scss';
import DifficultWordButton from './cardButtons/difficultWordButton';
import LearnedWordButton from './cardButtons/learnedWordButton';
import useUpdateUserWord from '~/hooks/useUpdateUserWord';
import { IUserWord } from '~/models/IUserWord';

interface CardWordBlockButtonProps {
  word: IWord & IUserWord;
}

const CardWordBlockButton: FC<CardWordBlockButtonProps> = ({ word }) => {
  const { updateWord, updateWordDifficulty } = useUpdateUserWord();
  return (
    <div className="card__buttons">
      <div className={`card__progress__block card__color${word.group}`}>
        <span>Progress: </span>
        <span>{word.optional?.success}</span>
        <span>/</span>
        <span>{word.optional?.allAttemts}</span>
      </div>
      <div className="card__buttons__block">
        <DifficultWordButton
          classString={word.difficulty === SETTINGS.HARD_WORD ? `card__color${word.group}` : ''}
          onClick={() =>
            word.difficulty === SETTINGS.HARD_WORD
              ? updateWordDifficulty(word, { difficulty: SETTINGS.NORMAL_WORD })
              : updateWordDifficulty(word, { difficulty: SETTINGS.HARD_WORD })
          }
        />
        <LearnedWordButton
          classString={word.optional?.learned === true ? 'card__button__learned-active' : ''}
          onClick={() =>
            word.optional?.learned === true
              ? updateWord(word, { learned: false })
              : updateWord(word, { learned: true })
          }
        />
      </div>
    </div>
  );
};

export default CardWordBlockButton;
