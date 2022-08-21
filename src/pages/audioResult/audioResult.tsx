/* eslint-disable react/jsx-no-bind */
import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../ui/loader/loader';
import WordService from '../../api/wordsService';
import './audioResult.scss';

// eslint-disable-next-line react/function-component-definition
const AudioResult: FC = () => {
  const [buff, setBuff] = useState<{
    word: string, translate: string, audio: string, answer: boolean
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const result = JSON.parse(localStorage.getItem('res') as string) as { id: string, answer: boolean }[];

  function sound(path: string) {
    const audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
  }
  const arr: { word: string; translate: string; audio: string; answer: boolean; }[] = [];
  function getResult() { 
    result?.forEach((item: { id: string, answer: boolean }) => {
      const el = WordService.getWord(item.id)
        .then((response) => {
          const obj = {
            word: response.data.word,
            translate: response.data.wordTranslate,
            audio: response.data.audio,
            answer: item.answer,
          };
          arr.push(obj);
        }).then(
          () => {},
        );
    });
    setTimeout(() => { setBuff(arr); }, 1000);
  }
  useEffect(() => {
    getResult();
    setTimeout(() => { setLoading(false); }, 2000);
  }, []);
  return (
    <div className="audioresult">
      { (loading === true)
        ? <Loader />
        : <div>
          <NavLink className="audioresult__close _icon-close" to="/" />
        <div className="audioresult__contaniner">
          <div className="audioresult__header">Твои результаты</div>
          {buff.map((item) => (
            <div className="audioresult__item" key={item.word}>
              <div className="audioresult__item_recoder _icon-volum" onClick={() => { sound(`https://rs-lang-team148.herokuapp.com/${item.audio}`); }} role="button" tabIndex={0} onKeyDown={() => {}}> </div>
              <div className="audioresult__item_word">{item.word}</div>
              <div className="audioresult__item_translate">{item.translate}</div>
              <div className={`audioresult__item_answer ${item.answer ? '_icon-true1' : '_icon-false'}`} />
            </div>
          ))}
          <NavLink className="audioresult__repeat _icon-refresh" to="/audiocall/game" />
        </div>
        </div>
      }
    </div>
  );
};

export default AudioResult;
