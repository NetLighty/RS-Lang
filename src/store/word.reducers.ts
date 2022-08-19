import { AddWordsAction, WordActionsTypes, WordsStateType } from '../models/IWord';

const initialState:WordsStateType = {};
export default
// turn off rule 'default-param-last' becase of reducer, I can't replace param
function wordReducer(
  /* eslint-disable */
  state:WordsStateType = initialState, 
  action:AddWordsAction):WordsStateType {
     /* eslint-disable */
  if (action.type === WordActionsTypes.ADD_WORDS) {
    const newWords:WordsStateType = { ...state };
    if (!newWords[action.payload.group]) newWords[action.payload.group] = {};
    newWords[action.payload.group][action.payload.page] = action.payload.data;
    return newWords;
  }
  return state;
}
