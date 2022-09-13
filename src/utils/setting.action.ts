import { AxiosResponse } from 'axios';
import UserService from '~/api/userService';
import UserWordService from '~/api/userWordsService';
import { DefaultSettingsOptional, ISettings, SettingsOptional } from '~/models/ISetting';
import { IUserResponse } from '~/models/IUser';
import { IUserWord } from '~/models/IUserWord';

export async function getUserWordsById(userId: string, wordId:string) {
  try {
    const response:AxiosResponse = await UserWordService.getUserWord(userId, wordId);
    const data = (await response.data) as IUserWord;
    return data;
  } catch (error) {
    return error;
  }
}
export async function updateSettingsData(
  userId: string,
  wordsPerDay: number,
  optional: SettingsOptional,
) {
  try {
    const response:AxiosResponse = await UserService.upsertUserSettings(
      userId,
      wordsPerDay,
      optional,
    );
    const data = (await response.data) as ISettings;
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSettingsData(userId: string) {
  const optional = DefaultSettingsOptional;
  try {
    const response:AxiosResponse = await UserService.getUserSettings(userId);
    const data = (await response.data) as ISettings;
    return data;
  } catch (error) {
    return updateSettingsData(userId, 1, optional);
  }
}

export async function getUserById(userId: string) {
  try {
    const response:AxiosResponse = await UserService.getUser(userId);
    const data = (await response.data) as IUserResponse;
    return data;
  } catch (error) {
    return error;
  }
}
