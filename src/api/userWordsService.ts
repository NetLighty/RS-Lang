import { AxiosResponse } from 'axios';
import { Options, IUserWord } from '../models/IUserWord';
import { IWord } from '../models/IWord';
import apiUrl from '../utils/api';
import axiosInstance from './interceptors/axiosInterceptor';

export default class UserWordService {
  static async getAllUserWords(id: string)
    : Promise<AxiosResponse<IUserWord[]>> {
    return axiosInstance.get(`${apiUrl}/users/${id}/words`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  static async getUserWord(userId: string, wordId: string)
    : Promise<AxiosResponse<IUserWord>> {
    return axiosInstance.get(`${apiUrl}/users/${userId}/words/${wordId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  static async createUserWord(
    userId: string,
    wordId: string,
    difficulty: string,
    optional?: Options,
  ): Promise<AxiosResponse<IUserWord>> {
    const body = JSON.stringify({ difficulty, optional });
    return axiosInstance.post(`${apiUrl}/users/${userId}/words/${wordId}`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static async updateUserWord(
    userId: string,
    wordId: string,
    difficulty: string,
    optional?: Options,
  ): Promise<AxiosResponse<IUserWord>> {
    return axiosInstance.put(`${apiUrl}/users/${userId}/words/${wordId}`, { difficulty, optional }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static async deleteUserWord(userId: string, wordId: string): Promise<AxiosResponse> {
    return axiosInstance.delete(`${apiUrl}/users/${userId}/words/${wordId}`);
  }

  static async getUserAggregatedWord(
    userId: string,
    wordId: string,
  ): Promise<AxiosResponse<IUserWord>> {
    return axiosInstance.get(`${apiUrl}/users/${userId}/aggregatedWords/${wordId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  static async getAllUserAggregatedWords(
    id: string,
    filter?: string,
    group?: string,
    wordsPerPage?: string,
    page?: string,
  ): Promise<AxiosResponse<IWord[]>> {
    const url = new URL(`${apiUrl}/users/${id}/aggregatedWords`);
    if (group) url.searchParams.set('group', group);
    if (page) url.searchParams.set('page', page);
    if (wordsPerPage) url.searchParams.set('wordsPerPage', wordsPerPage);
    if (filter) url.searchParams.set('filter', filter);
    return axiosInstance.get((url as unknown as string), {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
