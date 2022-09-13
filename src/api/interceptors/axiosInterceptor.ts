import axios, { AxiosResponse } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';
import apiUrl from '~/utils/api';
import { localStorageNames } from '~/utils/auth';
import { TokenDto } from './axiosInterceptors.types';
import { Auth } from '~/models/Auth';

const accessToken = localStorage.getItem(localStorageNames.accesToken);
const refreshToken = localStorage.getItem(localStorageNames.refreshToken);
const userId = localStorage.getItem(localStorageNames.userId);
const isAuth = localStorage.getItem(localStorageNames.isAuth);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${accessToken || ''}` },
});

const getNewUserTokens = async (id: string, token: string): Promise<AxiosResponse<Auth>> => axios.get<Auth>(`${apiUrl}/users/${id}/tokens`, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const actualAccessToken = localStorage.getItem(localStorageNames.accesToken);
  if (req.headers) {
    req.headers.Authorization = `Bearer ${actualAccessToken || ''}`;
  }

  if (isAuth === 'true' && userId) {
    /* if (!accessToken || !refreshToken) {
      accessToken = localStorage.getItem(localStorageNames.accesToken);
      refreshToken = localStorage.getItem(localStorageNames.refreshToken);
      req.headers.Authorization = `Bearer ${accessToken || ''}`;
    } */
    const decodedJwt = jwt_decode<JwtPayload>(accessToken || '') as TokenDto;
    const isExpired = dayjs.unix(decodedJwt.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    }
    const res = await getNewUserTokens(userId, refreshToken || '');
    localStorage.setItem(localStorageNames.accesToken, res.data.token);
    localStorage.setItem(localStorageNames.refreshToken, res.data.refreshToken);
    if (req.headers) {
      req.headers.Authorization = `Bearer ${localStorage.getItem(localStorageNames.accesToken) || ''}`;
    }
  }
  return req;
});

export default axiosInstance;
