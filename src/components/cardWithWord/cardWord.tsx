import React, { FC } from 'react';
import { IWord } from '../../models/IWord';
import './cardWord.scss';

interface CardWordProps {
  word: IWord;
}

const CardWord:FC<CardWordProps> = ({ word }) => (
  <div className="card">
    {word.word}
  </div>
);

export default CardWord;
