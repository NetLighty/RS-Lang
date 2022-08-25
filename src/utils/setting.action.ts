import { AxiosResponse } from 'axios';
import UserService from '~/api/userService';
import UserWordService from '~/api/userWordsService';
import { ISettings, ISettingsPut, SettingsOptional } from '~/models/ISetting';
import { IUserWord } from '~/models/IUserWord';

export async function getUserWordsById(userId: string, wordId:string, token:string) {
  try {
    const response:AxiosResponse = await UserWordService.getUserWord(userId, wordId, token);
    const data = (await response.data) as IUserWord;
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSettingsData(userId: string, token: string) {
  try {
    const response:AxiosResponse = await UserService.getUserSettings(userId, token);
    const data = (await response.data) as ISettings;
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateSettingsData(
  userId: string,
  wordsPerDay: number,
  token: string,
  optional: SettingsOptional,
) {
  try {
    const response:AxiosResponse = await UserService.upsertUserSettings(
      userId,
      wordsPerDay,
      token,
      optional,
    );
    const data = (await response.data) as ISettings;
    return data;
  } catch (error) {
    return error;
  }
}
