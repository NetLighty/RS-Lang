import { IWord } from '~/models/IWord';
import {
  SetSprintCorrectSerieAction,
  SetSprintCorrectWordsAction,
  SetSprintViewAction,
  SetSprintWordsAction,
  SetSprintWrongWordsAction,
  SprintActionEnum,
  SprintView,
} from './types';

const SprintActionCreators = {
  setSprintWords: (words: IWord[]): SetSprintWordsAction => ({
    type: SprintActionEnum.SET_SPRINT_WORDS,
    payload: words,
  }),
  setSprintView: (view: SprintView): SetSprintViewAction => ({
    type: SprintActionEnum.SET_SPRINT_VIEW,
    payload: view,
  }),
  setSprintCorrectSerie: (correctSerie: number): SetSprintCorrectSerieAction => ({
    type: SprintActionEnum.SET_SPRINT_CORRECT_SERIE,
    payload: correctSerie,
  }),
  setSprintCorrectWords: (words: IWord[]): SetSprintCorrectWordsAction => ({
    type: SprintActionEnum.SET_SPRINT_CORRECT_WORDS,
    payload: words,
  }),
  setSprintWrongWords: (words: IWord[]): SetSprintWrongWordsAction => ({
    type: SprintActionEnum.SET_SPRINT_WRONG_WORDS,
    payload: words,
  }),
};

export default SprintActionCreators;
