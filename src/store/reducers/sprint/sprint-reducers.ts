import { SprintAction, SprintActionEnum, SprintState } from './types';

const initialState: SprintState = {
  sprintWords: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function sprintReducer(state = initialState, action: SprintAction): SprintState {
  switch (action.type) {
    case SprintActionEnum.SET_SPRINT_WORDS:
      return { ...state, sprintWords: action.payload };
    default:
      return state;
  }
}
