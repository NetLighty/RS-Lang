import { CurrentUser } from '~/store/reducers/auth/types';
import { localStorageNames } from '~/utils/auth';
import UserService from '../userService';

export const loginUser = async (email: string, password: string): Promise<CurrentUser | null> => {
  const loginRes = await UserService.signIn(email, password);
  if (loginRes.status === 200) {
    localStorage.setItem(localStorageNames.isAuth, 'true');
    localStorage.setItem(localStorageNames.userName, loginRes.data.name);
    localStorage.setItem(localStorageNames.userId, loginRes.data.userId);
    localStorage.setItem(localStorageNames.accesToken, loginRes.data.token);
    localStorage.setItem(localStorageNames.refreshToken, loginRes.data.refreshToken);
    return { id: loginRes.data.userId, name: loginRes.data.name };
  }
  return null;
};

export const registrationUser = async (name: string, email: string, password: string) => {
  const regRes = await UserService.createUser(name, email, password);
  console.log('createUser');
  console.log(regRes);
  return regRes;
};

export const logoutUser = () => {
  localStorage.removeItem(localStorageNames.isAuth);
  localStorage.removeItem(localStorageNames.userName);
  localStorage.removeItem(localStorageNames.userId);
  localStorage.removeItem(localStorageNames.accesToken);
  localStorage.removeItem(localStorageNames.refreshToken);
  localStorage.removeItem(localStorageNames.bookGroup);
  localStorage.removeItem(localStorageNames.bookPage);
  localStorage.removeItem(localStorageNames.statistics);
};

/* const refreshUserTokens = async () => {
  const userId = localStorage.getItem(localStorageNames.userId);
  const refreshToken = localStorage.getItem(localStorageNames.refreshToken);
  if (userId && refreshToken) {
    const res = await UserService.getNewUserTokens(userId, refreshToken);
    localStorage.setItem(localStorageNames.accesToken, res.data.token);
    localStorage.setItem(localStorageNames.refreshToken, res.data.refreshToken);
  }
}; */
