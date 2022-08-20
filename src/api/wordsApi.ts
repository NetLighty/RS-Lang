import axios from 'axios';
import { IWord } from '../models/IWord';

const url = 'https://rs-lang-team148.herokuapp.com';

async function getWords(group: string, page: string) {
  const response = await axios.get<IWord[]>(`${url}/words?group=${group}&page=${page}`);
  return response.data;
}

export default getWords;
