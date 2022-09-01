import { IWord } from '~/models/IWord';

export interface SprintState {
  sprintWords: IWord[];
}

export enum SprintActionEnum {
  SET_SPRINT_WORDS = 'SET_SPRINT_WORDS',
}

export interface SetSprintWordsAction {
  type: SprintActionEnum.SET_SPRINT_WORDS;
  payload: IWord[];
}

export type SprintAction =
SetSprintWordsAction;
