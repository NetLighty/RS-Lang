import { Dispatch } from 'redux';
import {
  AddWordsAction, IWord, WordActionsTypes, WordRequest,
} from '../models/IWord';
import SETTINGS from '../utils/settings';

export const addWords = (requestInfo:WordRequest) => (
  { type: WordActionsTypes.ADD_WORDS, payload: requestInfo });

export function getWordsFromServer(group = 0, page = 0) {
  return async (dispatch:Dispatch<AddWordsAction>) => {
    try {
      // TODO replace it with axious
      const response:Response = await fetch(`${SETTINGS.BASE_URL}/words?page=${page}&group=${group}`);
      const data = (await response.json()) as Array<IWord>;
      dispatch(addWords({ group, page, data }));
      return data;
    } catch (error) {
      return error;
    }
  };
}
