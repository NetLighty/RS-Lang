import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './audioCall.scss';
import axios from 'axios';
import { IWord } from '../../models/IWord';

const obj = {
  id: '',
  group: 0,
  page: 0,
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
};
function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

// eslint-disable-next-line react/function-component-definition
const AudioCall: FC = () => {
  const [levelWords, setLevelWords] = useState<IWord[]>([]);
  // const buff = getWords('1', '2').then((res) => { setLevelWords(res); });

  const [translateWords, setTranslateWord] = useState<string[]>([]);
  const [amountWords, setAmountWords] = useState(1);
  const [result, setResult] = useState<{ id: string, answer: boolean }[]>([]);
  const [currWord, setCurrWord] = useState(obj);
  let i = 0;
  const buff: string[] = [];
  async function fetchWords(group: string, page: string) {
    try {
      const response = await axios.get<IWord[]>(`https://rs-lang-team148.herokuapp.com/words?group=${group}&page=${page}`);
      const words: IWord[] = response.data;
      setLevelWords(words);
      let curr = words[Math.floor(Math.random() * 20)];
      while (
        result.includes({ id: curr.id, answer: true })
        || result.includes({ id: curr.id, answer: false })
      ) {
        curr = words[Math.floor(Math.random() * 20)];
      }
      setCurrWord(curr);
      while (i < 4) {
        let randomWord: string = words[Math.floor(Math.random() * 20)].wordTranslate;
        while (buff.includes(randomWord) || curr.wordTranslate === randomWord) {
          randomWord = words[Math.floor(Math.random() * 20)].wordTranslate;
        }
        buff.push(randomWord);
        i += 1;
      }
      buff.push(curr.wordTranslate);
      setTranslateWord(shuffle(buff));
      const audio = new Audio(`https://rs-lang-team148.herokuapp.com/${curr.audio}`);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      audio.play();
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    if (!levelWords.length) {
      fetchWords(localStorage.audiolevel as string, Math.floor(Math.random() * 30).toString()).then(
        () => { console.log(translateWords); },
        () => {},
      );
    }
  });

  function sound(path: string) {
    const audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
  }

  function chooseAnswer(e: React.SyntheticEvent) {
    const answer = [...document.querySelectorAll('.audiogame__translate_item')];
    answer.map((item) => item.setAttribute('disabled', 'true'));
    const target = e.target as HTMLInputElement;
    target.classList.add('choose-answer');
    if (currWord.wordTranslate === target.textContent) {
      setResult([...result, { id: (currWord.id), answer: true }]);
      setTimeout(() => {
        const audio = new Audio('https://promosounds.ru/wp-content/uploads/2021/10/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1.mp3');
        audio.play();
        target.classList.add('true-answer');
        document.querySelector('.audiogame__header_img')?.classList.add('show-img');
      }, 1000);
    } else {
      setResult([...result, { id: (currWord.id), answer: false }]);
      setTimeout(() => {
        const audio = new Audio('https://promosounds.ru/wp-content/uploads/2021/10/standartnyy-zvuk-s-oshibochnym-otvetom.mp3');
        audio.play();
        target.classList.add('false-answer');
        setTimeout(() => {
          answer.forEach((item) => {
            if (item.textContent === currWord.wordTranslate) item.classList.add('true-answer');
            document.querySelector('.audiogame__header_img')?.classList.add('show-img');
          });
        }, 1000);
      }, 1000);
    }
    setTimeout(() => {
      document.querySelector('.audiogame__header_img')?.classList.remove('show-img');
      if (amountWords < 5) {
        fetchWords(localStorage.audiolevel as string, Math.floor(Math.random() * 30).toString())
          .then(
            () => {},
            () => {},
          );
        setAmountWords(amountWords + 1);
      } else {
        setResult([...result, { id: '0', answer: false }]);
        console.log(result);
        localStorage.setItem('res', JSON.stringify(result));
        const pageRes: HTMLElement | null = document.querySelector('.audiogame__result');
        setTimeout(() => { pageRes?.click(); }, 2000);
      }
    }, 3000);
  }

  return (
    <div className="audiogame">
      <NavLink className="audiogame__close _icon-close" to="/" />
      <NavLink className="audiogame__result" to="/audiocall/result" />
      <div className="audiogame__container">
        <div className="audiogame__header">
          <p className="audiogame__header_amount">
            {amountWords}
            /20
          </p>
          <img className="audiogame__header_img" src={`https://rs-lang-team148.herokuapp.com/${currWord.image}`} alt="" />
        </div>
        <div className="audiogame__recoder _icon-volum" onClick={() => { sound(`https://rs-lang-team148.herokuapp.com/${currWord.audio}`); }} role="button" tabIndex={0} onKeyDown={() => {}}> </div>
        <div className="audiogame__translate" onClick={(e) => { chooseAnswer(e); }} role="button" tabIndex={0} onKeyDown={() => {}}>
          {translateWords.map((item) => <button className="audiogame__translate_item" key={item} type="button">{item}</button>)}
        </div>
      </div>
    </div>
  );
};

export default AudioCall;
