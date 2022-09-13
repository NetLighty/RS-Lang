import { SprintAction, SprintActionEnum, SprintState } from './types';

const initialState: SprintState = {
  sprintWords: [],
  sprintCorrectWords: [],
  sprintWrongWords: [],
  sprintView: 'start',
  sprintCorrectSerie: 0,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function sprintReducer(state = initialState, action: SprintAction): SprintState {
  switch (action.type) {
    case SprintActionEnum.SET_SPRINT_WORDS:
      return { ...state, sprintWords: action.payload };
    case SprintActionEnum.SET_SPRINT_CORRECT_WORDS:
      return { ...state, sprintCorrectWords: action.payload };
    case SprintActionEnum.SET_SPRINT_WRONG_WORDS:
      return { ...state, sprintWrongWords: action.payload };
    case SprintActionEnum.SET_SPRINT_VIEW:
      return { ...state, sprintView: action.payload };
    case SprintActionEnum.SET_SPRINT_CORRECT_SERIE:
      return { ...state, sprintCorrectSerie: action.payload };
    default:
      return state;
  }
}
