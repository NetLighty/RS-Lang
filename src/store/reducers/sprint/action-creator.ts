import { IWord } from '~/models/IWord';
import { SetSprintWordsAction, SprintActionEnum } from './types';

const SprintActionCreators = {
  setSprintWords: (words: IWord[]): SetSprintWordsAction => ({
    type: SprintActionEnum.SET_SPRINT_WORDS,
    payload: words,
  }),
};

export default SprintActionCreators;
