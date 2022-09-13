export interface ISettings {
  wordsPerDay: number,
  optional?: SettingsOptional,
}

export interface ISettingsRes {
  id: string,
  wordsPerDay: number,
  optional?: SettingsOptional,
}

export interface SettingsOptional {
  audioSuccess: number,
  audioTotalCount: number,
  audioSeries: number,
  sprintSuccess: number,
  sprintTotalCount: number,
  sprintSeries: number,
  dataSettings: string,
}

export const DefaultSettingsOptional = {
  audioSuccess: 0,
  audioTotalCount: 0,
  audioSeries: 0,
  sprintSuccess: 0,
  sprintTotalCount: 0,
  sprintSeries: 0,
  dataSettings: '0',
};
