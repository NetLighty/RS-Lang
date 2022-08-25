import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IWord } from '../../models/IWord';
import { IAnswer } from '../../models/IAnswer';
import obj from '../../models/emptyWord';
import WordService from '../../api/wordsService';
import Loader from '../../ui/loader/loader';
import {
  sound, shuffle, getDocumentElement, generateNum, chooseKeyDown, falseAnswer, trueAnswer,
} from '../../utils/subGameFunc';
import {
  getCurrentWord,
  generateTranslateWord,
  clearStyleButton, showImage, hideImage, audioBlockButton, audioPlay,
} from '../../utils/audioFunc';
import './audioCall.scss';

const AudioCall: FC = () => {
  const [levelWords, setLevelWords] = useState<IWord[]>([]);
  const [translateWords, setTranslateWord] = useState<string[]>([]);
  const [amountWords, setAmountWords] = useState(1);
  const [result, setResult] = useState<IAnswer[]>([]);
  const [prevWords, setprevWords] = useState<string[]>([]);
  const [currWord, setCurrWord] = useState(obj);
  const [loading, setLoading] = useState(true);
  const testResult: IAnswer[] = [];
  let arrTranslate: string[] = [];
  let count = 1;
  let flag: boolean;

  async function fetchWords(group: string, page: string) {
    clearStyleButton();
    try {
      const response = (await WordService.getChunkOfWords(group, page));
      const words: IWord[] = response.data;
      setLevelWords(words);
      const current = getCurrentWord(words, prevWords);
      setprevWords([...prevWords, current.id]);
      setCurrWord(current);
      arrTranslate = generateTranslateWord(words, current);
      setTranslateWord(shuffle(arrTranslate));
      if (loading === true) {
        setTimeout(() => { setLoading(false); audioPlay(current); }, 2000);
      } else audioPlay(current);
    } catch (e) { console.log(e); }
  }

  function showWord() {
    flag = false;
    fetchWords(localStorage.audiolevel as string, generateNum(30).toString())
      .then(
        () => {},
        () => {},
      );
  }

  useEffect(() => {
    if (!levelWords.length && flag !== false) {
      showWord();
    }
  });

  function showTrueWord(arr: Element[], curr: IWord) {
    arr.forEach((item) => {
      if (item.textContent === curr.wordTranslate) item.classList.add('true-answer');
      showImage();
    });
  }

  function checkAnswer(target: HTMLInputElement, answer: Element[]) {
    if (currWord.wordTranslate === target.textContent) {
      testResult.push({ id: currWord.id, answer: true });
      setResult([...result, { id: (currWord.id), answer: true }]);
      setTimeout(() => {
        trueAnswer(target);
        showImage();
      }, 1000);
    } else {
      testResult.push({ id: currWord.id, answer: false });
      setResult([...result, { id: (currWord.id), answer: false }]);
      setTimeout(() => {
        falseAnswer(target);
        setTimeout(() => {
          showTrueWord(answer, currWord as IWord);
        }, 1000);
      }, 1000);
    }
  }

  function goToResult() {
    localStorage.setItem('audiores', JSON.stringify(result.concat(testResult)));
    localStorage.setItem('gameName', 'audio');
    const pageRes: HTMLElement | null = document.querySelector('.audiogame__result');
    pageRes?.click();
  }

  function checkAmount() {
    setTimeout(() => {
      hideImage();
      setAmountWords(amountWords + 1);
      count = amountWords + 1;
      if (count <= 10) {
        showWord();
      } else {
        goToResult();
      }
    }, 3000);
  }

  function chooseAnswer(e: React.SyntheticEvent) {
    const answer = getDocumentElement('.audiogame__translate_item');
    audioBlockButton();
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('audiogame__translate_item')) {
      target.classList.add('choose-answer');
      checkAnswer(target, answer);
      checkAmount();
    } else {
      clearStyleButton();
    }
  }

  document.onkeydown = chooseKeyDown;

  return (
    <div className="audiogame">
      { loading === true
        ? <div className="gameresult__loader"><Loader /></div>
        : (
          <div>
            <NavLink className="audiogame__close _icon-close" to="/" />
            <NavLink className="audiogame__result" to="/audiocall/result" />
            <div className="audiogame__container">
              <div className="audiogame__header">
                <p className="audiogame__header_amount">
                  {amountWords}
                  /10
                </p>
                <img className="audiogame__header_img" src={`https://rs-lang-team148.herokuapp.com/${currWord.image}`} alt="" />
              </div>
              <div className="audiogame__recoder _icon-volum" onClick={() => { sound(`https://rs-lang-team148.herokuapp.com/${currWord.audio}`); }} role="button" tabIndex={0} onKeyDown={() => {}}> </div>
              <div className="audiogame__translate" onClick={(e) => { chooseAnswer(e); }} role="button" tabIndex={0} onKeyDown={() => {}}>
                {translateWords.map((item) => <button className="audiogame__translate_item" key={item} type="button">{item}</button>)}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default AudioCall;
