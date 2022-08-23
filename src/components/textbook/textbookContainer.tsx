import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index.reducers';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from '../../models/IWord';
import { addCurrentBookWords } from '../../store/textbook.actions';
import CardWord from '../cardWithWord/cardWord';
import Loading from '../loading/loading';
import useGetUserWords from '~/hooks/useGetUserWords';

const TextbookContainer:FC = () => {
  const { bookPageWords, getWords, isLoading } = useGetWords();
  const { dowloadUserWords } = useGetUserWords();
  const dispatch = useDispatch();
  const group = useSelector((state:RootState) => state.textbook.group);
  const page = useSelector((state:RootState) => state.textbook.page);
  const wordsToRender = useSelector((state:RootState) => state.textbook.bookWords);

  useEffect(() => {
    // loginUserId();
    getWords(group, page);
    dowloadUserWords();
  }, [group, page, getWords, dowloadUserWords]);

  useEffect(() => {
    if (bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]));
  }, [bookPageWords, dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      {wordsToRender?.length
        ? wordsToRender.map((word:IWord) => <CardWord key={word.id} word={word} />)
        : null}
    </>
  );
};

export default TextbookContainer;
