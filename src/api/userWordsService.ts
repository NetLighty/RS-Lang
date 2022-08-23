import axios, { AxiosResponse } from 'axios';
import { Options } from '../models/IUserWord';
import { IUserWord } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';
import apiUrl from '~/utils/api';

export default class UserWordService {
  static async getAllUserWords(id: string, token: string)
    : Promise<AxiosResponse<IUserWord[]>> {
    return axios.get(`${apiUrl}/users/${id}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  static async getUserWord(userId: string, wordId: string, token:string)
    : Promise<AxiosResponse<IUserWord>> {
    return axios.get(`${apiUrl}/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  static async createUserWord(
    userId: string,
    wordId: string,
    token: string,
    difficulty: string,
    optional?: Options,
  ): Promise<AxiosResponse<IUserWord>> {
    const body = JSON.stringify({ difficulty, optional });
    return axios.post(`${apiUrl}/users/${userId}/words/${wordId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static async updateUserWord(
    userId: string,
    wordId: string,
    token: string,
    difficulty: string,
    optional?: Options,
  ): Promise<AxiosResponse<IUserWord>> {
    return axios.put(`${apiUrl}/users/${userId}/words/${wordId}`, { difficulty, optional }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static async deleteUserWord(userId: string, wordId: string): Promise<AxiosResponse> {
    return axios.delete(`${apiUrl}/users/${userId}/words/${wordId}`);
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
