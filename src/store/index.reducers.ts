import { combineReducers } from 'redux';
import textbookReducer from './textbook.reducers';
import userWordsReducer from './userWords.reducers';
import wordReducer from './word.reducers';

export const rootReducer = combineReducers({
  words: wordReducer,
  textbook: textbookReducer,
  userWords: userWordsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
