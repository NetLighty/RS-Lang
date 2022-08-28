import { BookStateType, BookActions, BookActionsTypes } from '../models/ITextbook';

const initialState: BookStateType = {
  group: 0,
  page: 0,
};
// turn off rule 'default-param-last' becase of reducer, I can't replace param
export default function textbookReducer(
  /* eslint-disable */
  state: BookStateType = initialState,
  action: BookActions,
  /* eslint-disable */
): BookStateType {
  if (action.type === BookActionsTypes.ADD_CURRENT_GROUP) {
    return {
      ...state,
      group: action.payload,
    };
  }
  if (action.type === BookActionsTypes.ADD_CURRENT_PAGE) {
    return {
      ...state,
      page: action.payload,
    };
  }
  if (action.type === BookActionsTypes.ADD_CURRENT_PAGE_WORDS) {
    return {
      ...state,
      bookWords: action.payload,
    };
  }
  return state;
}
