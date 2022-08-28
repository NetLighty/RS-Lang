export interface IUserWord {
  difficulty: string;
  optional?: Options;
}

export type Options = {
  id: string;
  group: number;
  page: number;
  learned: boolean;
  success: number;
  allAttemts: number;
  dataupdate: string;
  audiogame: string;
  sprint: string;
};

export enum AddUserWordsActionsTypes {
  ADD_USER_WORDS_TO_STORE = 'ADD_USER_WORDS_TO_STORE',
}

export enum AddUserWordsIdActionsTypes {
  ADD_USER_WORD_TO_STORE = 'ADD_USER_WORD_TO_USER_STORE',
}

export enum UserWordsActionsTypes {
  GET_ALL_USER_WORDS = 'GET_ALL_USER_WORDS',
  GET_USER_WORDS = 'GET_USER_WORDS',
  CREATE_USER_WORD = 'CREATE_USER_WORD',
  UPDATE_USER_WORD = 'UPDATE_USER_WORD',
}

interface GetUserWordsAction {
  type: UserWordsActionsTypes.GET_ALL_USER_WORDS;
  payload: string;
}

type GetUserWordRequest = {
  id: string;
  wordId: string;
};

interface GetUserWordByIdAction {
  type: UserWordsActionsTypes.GET_USER_WORDS;
  payload: GetUserWordRequest;
}

type NoGetUserWordRequest = {
  id: string;
  wordId: string;
  body: Partial<IUserWord>;
};

interface CreateUserWordsAction {
  type: UserWordsActionsTypes.CREATE_USER_WORD;
  payload: NoGetUserWordRequest;
}

interface UpdateUserWordsAction {
  type: UserWordsActionsTypes.UPDATE_USER_WORD;
  payload: NoGetUserWordRequest;
}

export interface AddUserWordsToStoreAction {
  type: AddUserWordsActionsTypes.ADD_USER_WORDS_TO_STORE;
  payload: Array<IUserWord>;
}

export interface AddUserWordToStoreAction {
  type: AddUserWordsIdActionsTypes.ADD_USER_WORD_TO_STORE;
  payload: IUserWord;
}

export type UsersWordsStateType = {
  [group: number]: {
    [page: number]: Array<IUserWord>;
  };
};

export type UserWordsActions =
  | GetUserWordsAction
  | GetUserWordByIdAction
  | CreateUserWordsAction
  | UpdateUserWordsAction
  | AddUserWordsToStoreAction
  | AddUserWordToStoreAction;
