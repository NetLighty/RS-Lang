import { AxiosResponse } from 'axios';
import { Auth } from '../models/Auth';
import { ISettings, SettingsOptional } from '../models/ISetting';
import { IStatistic } from '../models/IStatistic';
import { IUser } from '../models/IUser';
import apiUrl from '../utils/api';
import axiosInstance from './interceptors/axiosInterceptor';

export default class UserService {
  static async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<IUser>> {
    return axiosInstance.post<IUser>(`${apiUrl}/users`, { name, email, password });
  }

  static async signIn(email: string, password: string): Promise<AxiosResponse<Auth>> {
    return axiosInstance.post<Auth>(`${apiUrl}/signin`, { email, password });
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return axiosInstance.get(`${apiUrl}/users/${id}`);
  }

  static async updateUser(
    id: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<IUser>> {
    return axiosInstance.put(`${apiUrl}/users/${id}`, { email, password });
  }

  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return axiosInstance.delete(`${apiUrl}/users/${id}`);
  }

  static async getUserStat(id: string): Promise<AxiosResponse<IStatistic>> {
    return axiosInstance.get(`${apiUrl}/users/${id}`);
  }

  static async upsertUserStat(
    id: string,
    learnedWords: number,
    optional?: Record<string, string>,
  ): Promise<AxiosResponse<IStatistic>> {
    return axiosInstance.put(`${apiUrl}/users/${id}`, { learnedWords, optional });
  }

  static async getUserSettings(id: string): Promise<AxiosResponse<ISettings>> {
    return axiosInstance.get(`${apiUrl}/users/${id}/settings`);
  }

  static async upsertUserSettings(
    id: string,
    wordsPerDay: number,
    optional?: SettingsOptional,
  ): Promise<AxiosResponse<ISettings>> {
    return axiosInstance.put(`${apiUrl}/users/${id}/settings`, { wordsPerDay, optional }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
