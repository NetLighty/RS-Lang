import { IWord } from '../models/IWord';
import { getDocumentElement, generateNum } from './subGameFunc';

export function generateTranslateWord(arr: IWord[], curr: IWord, amount: number) {
  let i = 0;
  const buff: string[] = [];
  while (i < 4) {
    let randomWord: string = arr[Math.floor(Math.random() * amount)].wordTranslate;
    while (buff.includes(randomWord) || curr.wordTranslate === randomWord) {
      randomWord = arr[Math.floor(Math.random() * amount)].wordTranslate;
    }
    buff.push(randomWord);
    i += 1;
  }
  buff.push(curr.wordTranslate);
  return buff;
}

export function getCurrentWord(arr: IWord[], res: string[], amount: number) {
  let current: IWord = arr[generateNum(amount)];
  while (res.includes(current.id)) current = arr[generateNum(amount)];
  return current;
}

export function clearStyleButton() {
  const answer = getDocumentElement('.audiogame__translate_item');
  answer.forEach((item) => {
    item.classList.remove('true-answer');
    item.classList.remove('false-answer');
    item.classList.remove('choose-answer');
    item.removeAttribute('disabled');
  });
}

export function showImage() {
  getDocumentElement('.audiogame__header_img')[0].classList.add('show-img');
}

export function hideImage() {
  getDocumentElement('.audiogame__header_img')[0].classList.remove('show-img');
}

export function audioBlockButton() {
  const answer = getDocumentElement('.audiogame__translate_item');
  answer.map((item) => item.setAttribute('disabled', 'true'));
}

export function audioPlay(curr: IWord) {
  const audio = new Audio(`https://rs-lang-team148.herokuapp.com/${curr.audio}`);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  audio.play();
}
