export interface ISettings {
  wordsPerDay: number,
  optional?: SettingsOptional,
}

export interface SettingsOptional {
  audioSuccess: number,
  audioTotalCount: number,
  sprintSuccess: number,
  sprintTotalCount: number,
  dataSettings: string,
}

export const DefaultSettingsOptional = {
  audioSuccess: 0,
  audioTotalCount: 0,
  sprintSuccess: 0,
  sprintTotalCount: 0,
  dataSettings: '',
};
