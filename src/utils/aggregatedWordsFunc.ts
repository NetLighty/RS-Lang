import { AxiosResponse } from 'axios';
import UserWordService from '~/api/userWordsService';
import WordService from '~/api/wordsService';
import { IAggregatedResponse } from '~/models/IAggregated';
import { IWord } from '~/models/IWord';

export async function getAggregatedWordsForGame(
  userId: string,
  filter?: string,
  group?: string,
  wordsPerPage?: string,
): Promise<IAggregatedResponse[] | unknown> {
  try {
    const response:AxiosResponse = await UserWordService.getAllUserAggregatedWords(
      userId,
      filter,
      group,
      wordsPerPage,
    );
    const data = (await response.data) as IAggregatedResponse[];
    return data;
  } catch (error) {
    return error;
  }
}

export async function getAggregatedWordsForStatistic(
  userId: string,
  filter?: string,
) {
  try {
    const response:AxiosResponse = await UserWordService.getAllUserAggregatedWords(
      userId,
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
