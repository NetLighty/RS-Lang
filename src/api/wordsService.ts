import { AxiosResponse } from 'axios';
import { IWord } from '../models/IWord';
import apiUrl from '../utils/api';
import axiosInstance from './interceptors/axiosInterceptor';

export default class WordService {
  static async getChunkOfWords(group: string, page: string): Promise<AxiosResponse<IWord[]>> {
    return axiosInstance.get(`${apiUrl}/words`, { params: { group, page } });
  }

  static async getWord(id: string): Promise<AxiosResponse<IWord>> {
    return axiosInstance.get(`${apiUrl}/words/${id}`);
  }
}
