import axios, { AxiosResponse } from 'axios';
import { Auth } from '../models/Auth';
import { ISettings } from '../models/ISetting';
import { IStatistic } from '../models/IStatistic';
import { IUser } from '../models/IUser';
import apiUrl from '../utils/api';

export default class UserService {
  static async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<IUser>> {
    return axios.post<IUser>(`${apiUrl}/users`, { name, email, password });
  }

  static async signIn(email: string, password: string): Promise<AxiosResponse<Auth>> {
    return axios.post<Auth>(`${apiUrl}/users`, { email, password });
  }

  static async getNewUserTokens(id: string): Promise<AxiosResponse<Auth>> {
    return axios.get<Auth>(`${apiUrl}/users/${id}/tokens`);
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return axios.get(`${apiUrl}/users/${id}`);
  }

  static async updateUser(
    id: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<IUser>> {
    return axios.put(`${apiUrl}/users/${id}`, { email, password });
  }

  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return axios.delete(`${apiUrl}/users/${id}`);
  }

  static async getUserStat(id: string): Promise<AxiosResponse<IStatistic>> {
    return axios.get(`${apiUrl}/users/${id}`);
  }

  static async upsertUserStat(
    id: string,
    learnedWords: number,
    optional?: Record<string, string>,
  ): Promise<AxiosResponse<IStatistic>> {
    return axios.put(`${apiUrl}/users/${id}`, { learnedWords, optional });
  }

  static async getUserSettings(id: string): Promise<AxiosResponse<ISettings>> {
    return axios.get(`${apiUrl}/users/${id}/settings`);
  }

  static async upsertUserSettings(
    id: string,
    wordsPerDay: number,
    optional?: Record<string, string>,
  ): Promise<AxiosResponse<ISettings>> {
    return axios.put(`${apiUrl}/users/${id}/settings`, { wordsPerDay, optional });
  }
}
