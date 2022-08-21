import { IWord } from '../models/IWord';

function generateTranslateWord(arr: IWord[], curr: IWord) {
  let i = 0;
  const buff: string[] = [];
  while (i < 4) {
    let randomWord: string = arr[Math.floor(Math.random() * 20)].wordTranslate;
    while (buff.includes(randomWord) || curr.wordTranslate === randomWord) {
      randomWord = arr[Math.floor(Math.random() * 20)].wordTranslate;
    }
    buff.push(randomWord);
    i += 1;
  }
  buff.push(curr.wordTranslate);
  return buff;
}

export default generateTranslateWord;
