import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import WordService from '../api/wordsService';
import {
  AddWordsAction, IWord, WordActionsTypes, WordRequest,
} from '../models/IWord';

export const addWords = (requestInfo:WordRequest) => (
  { type: WordActionsTypes.ADD_WORDS, payload: requestInfo });

export function getWordsFromServer(group = 0, page = 0) {
  return async (dispatch:Dispatch<AddWordsAction>) => {
    try {
      const response:AxiosResponse = await WordService
        .getChunkOfWords(group.toString(), page.toString());
      const data = (await response.data) as Array<IWord>;
      dispatch(addWords({ group, page, data }));
      return data;
    } catch (error) {
      return error;
    }
  };
}
