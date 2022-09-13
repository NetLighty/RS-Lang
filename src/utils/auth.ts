export const localStorageNames = {
  accesToken: 'token',
  refreshToken: 'refreshToken',
  userId: 'userId',
  userName: 'username',
  isAuth: 'auth',
  bookPage: 'bookPage',
  bookGroup: 'bookGroup',
  statistics: 'statistics',
  sprintNameRus: 'Спринт',
  theme: 'theme',
};

export const successfullRegistrationMsg = 'Successful creation.';
export const errorRegistrationMsg = 'Почта занята';

export const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) {
    return match[2];
  }
  return '';
};

export const createSecureCookie = (name: string, value: string, expirationTimeHours: number) => {
  const expirationDate = (
    new Date(Date.now() + 1000 * 60 * 60 * expirationTimeHours)
  ).toUTCString();
  document.cookie = `${name}=${value}; secure; sameSite=strict; expires=${expirationDate}`;
};
