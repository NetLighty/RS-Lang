import { IWord } from '../models/IWord';
import generateNum from './generateWordNumber';

function getCurrentWord(arr: IWord[], res: string[]) {
  let current: IWord = arr[generateNum(20)];
  while (res.includes(current.id)) current = arr[generateNum(20)];
  return current;
}

export default getCurrentWord;
