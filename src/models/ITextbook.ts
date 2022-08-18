import { IWord } from "./IWord"

export enum BookActionsTypes {
  ADD_CURRENT_PAGE_WORDS = 'ADD_CURRENT_PAGE_WORDS',
  ADD_CURRENT_GROUP = 'ADD_CURRENT_CROUP',
  ADD_CURRENT_PAGE = 'ADD_CURRENT_PAGE'
}

export type BookStateType = {
  group: number,
  page: number,
  bookWords?: Array<IWord>
}

interface AddPageAction {
  type: BookActionsTypes.ADD_CURRENT_PAGE
  payload: number;
}

interface AddGroupAction {
  type: BookActionsTypes.ADD_CURRENT_GROUP
  payload: number;
}

interface AddBookWordsAction {
  type: BookActionsTypes. ADD_CURRENT_PAGE_WORDS
  payload: Array<IWord>;
}

export type BookActions = AddPageAction | AddGroupAction | AddBookWordsAction;
