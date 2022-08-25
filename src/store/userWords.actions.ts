import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { IWord } from '../models/IWord';
import {
  IUserWord, Options, AddUserWordsIdActionsTypes,
  AddUserWordsActionsTypes, AddUserWordToStoreAction,
  AddUserWordsToStoreAction,
}
  from '../models/IUserWord';
import UserWordService from '../api/userWordsService';

/* Add actions to userWords endpoints.
getUserWordsById calls as async functions.
For example, const data = await getUserWordsById(SETTINGS.USER_ID, word.id, SETTINGS.TOKEN);

Others functions calls using dispatch, because they save data to store for book
For example, dispatch(updateUserWord(SETTINGS.USER_ID, word, SETTINGS.TOKEN,
  { difficulty: 'light' }))
*/

export const addUserWordsToStore = (data: Array<IUserWord>) => (
  { type: AddUserWordsActionsTypes.ADD_USER_WORDS_TO_STORE, payload: data }
);

export const addWordToUser = (word:IUserWord) => (
  { type: AddUserWordsIdActionsTypes.ADD_USER_WORD_TO_STORE, payload: word }
);

export function getUserWords(userId: string, token:string) {
  return async (dispatch:Dispatch<AddUserWordsToStoreAction>) => {
    try {
      const response:AxiosResponse = await UserWordService.getAllUserWords(userId, token);
      const data = (await response.data) as Array<IUserWord>;
      dispatch(addUserWordsToStore(data));
      return data;
    } catch (error) {
      return error;
    }
  };
}

export async function getUserWordsById(userId: string, wordId:string, token:string) {
  try {
    const response:AxiosResponse = await UserWordService.getUserWord(userId, wordId, token);
    const data = (await response.data) as IUserWord;
    return data;
  } catch (error) {
    return error;
  }
}

// Don't send requests with empty strings. You get 422 Error

export function createUserWord(userId: string, word:IWord, token:string, data:IUserWord) {
  const defaultOptionalInfo:Options = {
    id: word.id,
    group: word.group,
    page: word.page,
    learned: false,
    result: false,
    success: 0,
    allAttemts: 0,
    dataupdate: '0',
    game: 'undefined',
    audiogame: '0',
    sprint: '0',
  };

  const userWord:IUserWord = {
    ...data,
    optional: {
      ...defaultOptionalInfo,
      ...data.optional,
    },
  };
  const { difficulty, optional } = userWord;
  return async (dispatch:Dispatch<AddUserWordToStoreAction>) => {
    try {
      const response:AxiosResponse = await UserWordService
        .createUserWord(userId, word.id, token, difficulty, optional);
      const wordResponse = (await response.data) as IUserWord;
      dispatch(addWordToUser(wordResponse));
      return wordResponse;
    } catch (error) {
      return error;
    }
  };
}

// Don't send requests with empty strings. You get 422 Error

export function updateUserWord(userId: string, word:IWord, token:string, data:IUserWord) {
  const defaultOptionalInfo:Options = {
    id: word.id,
    group: word.group,
    page: word.page,
    learned: false,
    result: false,
    success: 0,
    allAttemts: 0,
    dataupdate: '0',
    game: 'undefined',
    audiogame: '0',
    sprint: '0',
  };

  const userWord:IUserWord = {
    ...data,
    optional: {
      ...defaultOptionalInfo,
      ...data.optional,
    },
  };
  const { difficulty, optional } = userWord;
  return async (dispatch:Dispatch<AddUserWordToStoreAction>) => {
    try {
      const response:AxiosResponse = await UserWordService
        .updateUserWord(userId, word.id, token, difficulty, optional);
      const wordResponse = (await response.data) as IUserWord;
      dispatch(addWordToUser(wordResponse));
      return wordResponse;
    } catch (error) {
      return error;
    }
  };
}
