import axios, { AxiosResponse } from 'axios';
import { IUserWord } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';
import apiUrl from '~/utils/api';

export default class UserWordService {
  static async getAllUserWords(id: string): Promise<AxiosResponse<IUserWord[]>> {
    return axios.get(`${apiUrl}/${id}/words`);
  }

  static async getUserWord(userId: string, wordId: string): Promise<AxiosResponse<IUserWord>> {
    return axios.get(`${apiUrl}/${userId}/words/${wordId}`);
  }

  static async createUserWord(
    userId: string,
    wordId: string,
    difficulty: string,
    optional?: Record<string, string>,
  ): Promise<AxiosResponse<IUserWord>> {
    return axios.post(`${apiUrl}/${userId}/words/${wordId}`, { difficulty, optional });
  }

  static async updateUserWord(
    userId: string,
    wordId: string,
    difficulty: string,
    optional?: Record<string, string>,
  ): Promise<AxiosResponse<IUserWord>> {
    return axios.put(`${apiUrl}/${userId}/words/${wordId}`, { difficulty, optional });
  }

  static async deleteUserWord(userId: string, wordId: string): Promise<AxiosResponse> {
    return axios.delete(`${apiUrl}/${userId}/words/${wordId}`);
  }

  static async getUserAggregatedWord(
    userId: string,
    wordId: string,
  ): Promise<AxiosResponse<IUserWord>> {
    return axios.get(`${apiUrl}/${userId}/aggregatedWords/${wordId}`);
  }

  static async getAllUserAggregatedWords(
    id: string,
    group?: string,
    page?: string,
    wordsPerPage?: string,
    filter?: string,
  ): Promise<AxiosResponse<IWord[]>> {
    return axios.get(`${apiUrl}/${id}/aggregatedWords`, {
      params: {
        group,
        page,
        wordsPerPage,
        filter,
      },
    });
  }
}
