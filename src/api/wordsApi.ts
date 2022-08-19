import axios from 'axios';
import { IWord } from '../models/Iword';

const url = 'https://rs-lang-team148.herokuapp.com';

async function getWord(group?: string, page?: string) {
  const response = await axios.get(`${url}/words${group ? `?group=${group}` : ''}${page ? `&page=${page}` : ''}`);
  return response.data as Array<IWord>;
}

export default getWord;
