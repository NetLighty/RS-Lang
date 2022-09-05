import { combineReducers } from 'redux';
import authReducer from './reducers/auth/auth-reducers';
import sprintReducer from './reducers/sprint/sprint-reducers';
import textbookReducer from './textbook.reducers';
import userWordsReducer from './userWords.reducers';
import wordReducer from './word.reducers';

export const rootReducer = combineReducers({
  words: wordReducer,
  textbook: textbookReducer,
  userWords: userWordsReducer,
  auth: authReducer,
  sprint: sprintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
