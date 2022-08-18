import { BookStateType, BookActions, BookActionsTypes } from './../models/ITextbook';
const initialState:BookStateType = {
  group: 0,
  page: 0,
}
export default function textbookReducer(state:BookStateType = initialState, action:BookActions):BookStateType {
  if(action.type === BookActionsTypes.ADD_CURRENT_GROUP){
    return {
      ...state,
      group: action.payload
    }

  } else if (action.type === BookActionsTypes.ADD_CURRENT_PAGE){
    return {
      ...state,
      page: action.payload
    }

  }else if (action.type === BookActionsTypes.ADD_CURRENT_PAGE_WORDS){
    return {
      ...state,
      bookWords: action.payload
    }
  }
return state;
}
