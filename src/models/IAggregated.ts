import { IUserWord } from './IUserWord';

export interface IAggregated {
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
  userWord: IUserWord,
}

export interface IAggregatedResponse {
  paginatedResults: {
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
    userWord: IUserWord,
  }[]
  totalCount: { count: number }[]
}
