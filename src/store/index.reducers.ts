import { combineReducers} from 'redux';
import wordReducer from './word.reducers';

export const rootReducer = combineReducers({
  words: wordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
