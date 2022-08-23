import { AxiosResponse } from 'axios';
import { IWord } from '../models/IWord';
import { IUserWord, Options, UserWordsActionsTypes } from '../models/IUserWord';
import UserWordService from '../api/userWordsService';

export const addUserWordsToStore = (data: Array<IUserWord>) => (
  { type: UserWordsActionsTypes.ADD_WORDS_TO_STORE, payload: data }
);

export const addWordToUser = (word:IUserWord) => ({ type: UserWordsActionsTypes.ADD_WORD_TO_STORE, payload: word });

export function getUserWords(userId: string, token:string) {
  return async (dispatch: any) => {
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

export function getUserWordsById(userId: string, wordId:string, token:string) {
  return async () => {
    try {
      const response:AxiosResponse = await UserWordService.getUserWord(userId, wordId,token);
      const data = (await response.data) as IUserWord;
      return data;
    } catch (error) {
      return error;
    }
  };
}

export function createUserWord(userId: string, word:IWord, token:string, data:IUserWord) {
  const defaultOptionalInfo:Options = {
    id: word.id,
    group: word.group,
    page: word.page,
    learned: false,
    success: 0,
    allAttemts: 0,
    dataupdate: '0',
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
  return async (dispatch: any) => {
    try {
      const response:AxiosResponse = await UserWordService.createUserWord(userId, word.id, token, difficulty, optional);
      const data = (await response.data) as IUserWord;
      dispatch(addWordToUser(data));
      return data;
    } catch (error) {
      console.log('error');
      return error;
    }
  };
}

export function updateUserWord(userId: string, word:IWord, token:string, data:IUserWord) {
  const defaultOptionalInfo:Options = {
    id: word.id,
    group: word.group,
    page: word.page,
    learned: false,
    success: 0,
    allAttemts: 0,
    dataupdate: '',
    audiogame: '',
    sprint: '',
  };

  const userWord:IUserWord = {
    ...data,
    optional: {
      ...defaultOptionalInfo,
      ...data.optional,
    },
  };

  const { difficulty, optional } = userWord;
  return async (dispatch: any) => {
    try {
      const response:AxiosResponse = await UserWordService.updateUserWord(userId, word.id, token, difficulty, optional);
      const data = (await response.data) as IUserWord;
      dispatch(addWordToUser(data));
      return data;
    } catch (error) {
      return error;
    }
  };
}

// TODO delete after users information will be added. For testing
export const loginUser = async (user:any) => {
  const rawResponse = await fetch('https://rs-lang-team148.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();

  console.log(content);
};
//
