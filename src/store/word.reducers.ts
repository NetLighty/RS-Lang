import { AddWordsAction, WordActionsTypes, WordsStateType } from '../models/IWord';

const initialState:WordsStateType = {};
export default function wordReducer(state:WordsStateType = initialState, action:AddWordsAction):WordsStateType {
  if (action.type === WordActionsTypes.ADD_WORDS) {
   const newWords:WordsStateType = {...state};
    if(!newWords[action.payload.group]) newWords[action.payload.group] = {}
    newWords[action.payload.group][action.payload.page] = action.payload.data;
    return newWords;
  }
  return state;
}
