import React, { FC } from 'react';
import sound from '../../utils/sound';
import { IResultWord } from '../../models/IResultWord';
import './resultWord.scss';

interface ResultWordProps {
  item: IResultWord;
  prefixClass: string;
}

const ResultWord: FC<ResultWordProps> = ({ item, prefixClass }) => (
  <div className={`${prefixClass}__item`} key={item.word}>
    <div className={`${prefixClass}__item_recoder _icon-volum`} onClick={() => { sound(`https://rs-lang-team148.herokuapp.com/${item.audio}`); }} role="button" tabIndex={0} onKeyDown={() => {}}> </div>
    <div className={`${prefixClass}__item_word`}>{item.word}</div>
    <div className={`${prefixClass}__item_translate`}>{item.translate}</div>
    <div className={`${prefixClass}__item_answer ${item.answer ? '_icon-true1' : '_icon-false'}`} />
  </div>
);

export default ResultWord;
