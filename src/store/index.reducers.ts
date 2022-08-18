import { combineReducers} from 'redux';
import textbookReducer from './textbook.reducers';
import wordReducer from './word.reducers';

export const rootReducer = combineReducers({
  words: wordReducer,
  textbook: textbookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
