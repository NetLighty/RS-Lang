import { AxiosResponse } from 'axios';
import UserWordService from '~/api/userWordsService';
import WordService from '~/api/wordsService';
import { IAggregatedResponse } from '~/models/IAggregated';
import { AddWordsAction, IWord } from '~/models/IWord';

export async function getAggregatedWordsForGame(
  userId: string,
  token: string,
  group?: string,
  wordsPerPage?: string,
  filter?: string,
) {
  try {
    const response:AxiosResponse = await UserWordService.getAllUserAggregatedWords(
      userId,
      token,
      group,
      wordsPerPage,
      filter,
    );
    const data = (await response.data) as IAggregatedResponse[];
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAggregatedWords(
  userId: string,
  token: string,
  group?: string,
  page?: string,
  wordsPerPage?: string,
  filter?: string,
) {
  try {
    const response:AxiosResponse = await UserWordService.getAllUserAggregatedWords(
      userId,
      token,
      group,
      page,
      wordsPerPage,
      filter,
    );
    const data = (await response.data) as IAggregatedResponse[];
    return data;
  } catch (error) {
    return error;
  }
}

export async function getWordsOnPage(group: string, page: string) {
  try {
    const response:AxiosResponse = await WordService
      .getChunkOfWords(group, page);
    const data = (await response.data) as IWord[];
    return data;
  } catch (error) {
    return error;
  }
}
