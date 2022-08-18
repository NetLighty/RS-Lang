import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/index.reducers';
// import { useDispatch} from 'react-redux';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from './../../models/IWord';

function TextbookContainer ():JSX.Element {
  const { currentWords, getWords, isLoading } = useGetWords();
  // const dispatch = useDispatch();
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const wordsToRender = useSelector((state:RootState)=> state.words);

  useEffect(() => {
    getWords(group, page);
  }, [group,page]);


  return (
    <>
      {wordsToRender[group][page].length ? wordsToRender[group][page].map((word:IWord) => console.log(word)) : null}
    </>
  );
};

export default TextbookContainer;

