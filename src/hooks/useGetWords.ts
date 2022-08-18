import { IWord } from './../models/IWord';
import { RootState } from './../store/index.reducers';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWordsFromServer } from '../store/word.actions';
 type Request = {
  group: number| null,
  page: number| null,
 }
export default function useGetWords() {
  const dispatch = useDispatch();
  const words = useSelector((state:RootState)=> state.words);
  const [bookPageWords, setBookPageWords] = useState<Array<IWord>|null>(null);
  const [request, setRequest] = useState<Request> ({group:null, page:null})
  const [isLoading, setIsLoading] = useState(false);

  const getWords = (group:number, page:number) => {
    if (Object.keys(words).includes(group.toString()) && words[group][page]) {
      setBookPageWords(words[group][page]);
      setIsLoading(false);
      return words[group][page];
    } else {
    setIsLoading(true);
    setRequest({group,page})
    return dispatch(getWordsFromServer(group, page));
    }
  };

  useEffect(()=>{
    if(request.group !== null && request.page !== null && Object.keys(words).includes(request.group.toString()) && words[request.group][request.page]) {
      setBookPageWords(words [request.group][request.page]);
      setRequest({group:null, page:null});
    }
  },[words,request])
  
  return { bookPageWords, getWords, isLoading };
}
