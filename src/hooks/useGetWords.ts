import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWordsFromServer } from '../store/word.actions';

export default function useGetWords() {
  const dispatch = useDispatch();
  const words:any = useSelector((state) => state);
  const [currentWords, setCurrentWords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWords = (group:number, page:number) => {
    if (false) {
      setCurrentWords(words[group]);
      setIsLoading(false);
      return words[group];
    } else {
    setIsLoading(true);
    return dispatch(getWordsFromServer(group, page));
    }
  };
  return { currentWords, getWords, isLoading };
}
