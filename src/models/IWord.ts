export interface IWord {

  id:string,
  group:number,
  page:number,
  word:string,
  image:string,
  audio:string,
  audioMeaning:string,
  audioExample:string,
  textMeaning:string,
  textExample:string,
  transcription:string,
  wordTranslate:string,
  textMeaningTranslate:string,
  textExampleTranslate:string
}

export type WordRequest = {
  group: number,
  page: number,
  data: Array<IWord>
};

export enum WordActionsTypes {
  ADD_WORDS = 'ADD_WORDS',
}

export interface AddWordsAction {
  type: WordActionsTypes.ADD_WORDS
  payload: WordRequest;
}

export type WordsStateType = {
  [group:number]:{
    [page:number]: Array<IWord>
  }
};

