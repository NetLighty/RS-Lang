import { IWord } from '~/models/IWord';

export interface SprintState {
  sprintWords: IWord[];
  sprintWrongWords: IWord[];
  sprintCorrectWords: IWord[];
  sprintView: SprintView;
}

export type SprintView = 'start' | 'game' | 'result';

export enum SprintActionEnum {
  SET_SPRINT_WORDS = 'SET_SPRINT_WORDS',
  SET_SPRINT_VIEW = 'SET_SPRINT_VIEW',
  SET_SPRINT_CORRECT_WORDS = 'SET_SPRINT_CORRECT_WORDS',
  SET_SPRINT_WRONG_WORDS = 'SET_SPRINT_WRONG_WORDS',
}

export interface SetSprintWordsAction {
  type: SprintActionEnum.SET_SPRINT_WORDS;
  payload: IWord[];
}

export interface SetSprintCorrectWordsAction {
  type: SprintActionEnum.SET_SPRINT_CORRECT_WORDS;
  payload: IWord[];
}

export interface SetSprintWrongWordsAction {
  type: SprintActionEnum.SET_SPRINT_WRONG_WORDS;
  payload: IWord[];
}

export interface SetSprintViewAction {
  type: SprintActionEnum.SET_SPRINT_VIEW;
  payload: SprintView;
}

export type SprintAction =
SetSprintWordsAction |
SetSprintViewAction |
SetSprintCorrectWordsAction |
SetSprintWrongWordsAction;
