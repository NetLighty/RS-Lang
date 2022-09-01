import { AxiosResponse } from 'axios';
import WordService from '~/api/wordsService';
import { IWord } from '~/models/IWord';

async function getWordById(id: string) {
  try {
    const response: AxiosResponse = await WordService.getWord(id);
    const data = (await response.data) as IWord[];
    return data;
  } catch (error) {
    return error;
  }
}

export default getWordById;
