import { IWord } from '../models/IWord';
import { BookActionsTypes } from '../models/ITextbook';

export const addCurrentPage = (page: number) => ({
  type: BookActionsTypes.ADD_CURRENT_PAGE,
  payload: page,
});
export const addCurrentGroup = (group: number) => ({
  type: BookActionsTypes.ADD_CURRENT_GROUP,
  payload: group,
});
export const addCurrentBookWords = (words: Array<IWord>) => ({
  type: BookActionsTypes.ADD_CURRENT_PAGE_WORDS,
  payload: words,
});
