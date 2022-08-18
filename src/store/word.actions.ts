import {IWord, WordActionsTypes, WordRequest } from '../models/IWord';
import SETTINGS from '../utils/settings';

export const addWords = (requestInfo:WordRequest) => ({ type: WordActionsTypes.ADD_WORDS, payload: requestInfo });

export function getWordsFromServer(group = 0, page = 0):any {
  return async (dispatch: (arg0: any) => void) => {
    try {
      // TODO replace it with axious
      const response = await fetch(`${SETTINGS.BASE_URL}/words?page=${page}&group=${group}`);
      const data:Array<IWord> = await response.json();
      dispatch(addWords({ group, page, data }));
      return data;
    } catch (error:any) {
      console.log(error.message);
    }
  };
}
