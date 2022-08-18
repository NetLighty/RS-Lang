import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/index.reducers';
import { useDispatch} from 'react-redux';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from './../../models/IWord';
import { addCurrentBookWords } from './../../store/textbook.actions';
import CardWord from '../cardWithWord/cardWord';
import Loading from '../loading/loading';

const TextbookContainer:FC = () => {
  const { bookPageWords, getWords, isLoading } = useGetWords();
  const dispatch = useDispatch();
  const [group] = useState(0);
  const [page] = useState(0);
  const wordsToRender = useSelector((state:RootState)=> state.textbook.bookWords);

  useEffect(() => {
    getWords(group, page);
  }, [group,page]);

  useEffect(() => {
    if(bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]))
  }, [bookPageWords]);

  return (
    <>
      {isLoading && <Loading/>}
      {wordsToRender?.length ? wordsToRender.map((word:IWord) => <CardWord key={word.id} word={word}/>) : null}
    </>
  );
};

export default TextbookContainer;

