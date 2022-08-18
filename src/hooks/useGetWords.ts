import { IWord } from './../models/IWord';
import { RootState } from './../store/index.reducers';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWordsFromServer } from '../store/word.actions';

export default function useGetWords() {
  const dispatch = useDispatch();
  const words = useSelector((state:RootState)=> state.words);
  const [currentWords, setCurrentWords] = useState<Array<IWord>|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWords = (group:number, page:number) => {
    if (words[group][page]) {
      setCurrentWords(words[group][page]);
      setIsLoading(false);
      return words[group][page];
    } else {
    setIsLoading(true);
    return dispatch(getWordsFromServer(group, page));
    }
  };
  return { currentWords, getWords, isLoading };
}
