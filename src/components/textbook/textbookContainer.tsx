import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index.reducers';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from '../../models/IWord';
import { IUserWord } from '../../models/IUserWord';
import { addCurrentBookWords, addCurrentGroup, addCurrentPage } from '../../store/textbook.actions';
import CardWord from '../cardWithWord/cardWord';
import useGetUserWords from '~/hooks/useGetUserWords';
import Loader from '~/ui/loader/loader';
import SETTINGS from '~/utils/settings';

const TextbookContainer:FC = () => {
  const { bookPageWords, getWords, isLoading } = useGetWords();
  const { dowloadUserWords, userWords } = useGetUserWords();
  const dispatch = useDispatch();
  const group = Number(localStorage.getItem('bookGroup') || 0);
  const page = Number(localStorage.getItem('bookPage') || 0);
  const wordsToRender = useSelector((state:RootState) => state.textbook.bookWords);
  const isAuth = true;

  const findUserWord = useCallback((word:IWord) => {
    const currentUserWords = userWords[group][page];
    const currentWord = currentUserWords.find((item:IUserWord) => item.optional?.id === word.id);
    if (currentWord) {
      const newCurrentWord = {
        ...word,
        difficulty: currentWord.difficulty || SETTINGS.NORMAL_WORD,
        optional: {
          ...currentWord.optional,
        },
      };
      return newCurrentWord;
    }
    const newWord:IUserWord & IWord = {
      ...word,
      difficulty: SETTINGS.NORMAL_WORD,
      optional: {
        id: word.id,
        group: word.group,
        page: word.page,
        learned: false,
        result: false,
        countSuccessInRow: 0,
        success: 0,
        allAttemts: 0,
        dataupdate: new Date('1970-01-01'),
        game: 'undefined',
        audiogame: '0',
        sprint: '0',
      },
    };
    return newWord;
  }, [group, page, userWords]);

  useEffect(() => {
    dispatch(addCurrentGroup(Number(localStorage.getItem('bookGroup')) || 0));
    dispatch(addCurrentPage(Number(localStorage.getItem('bookPage')) || 0));
  }, [dispatch]);

  useEffect(() => {
    getWords(group, page);
  }, [group, page, getWords]);

  useEffect(() => {
    if (isAuth) {
      dowloadUserWords();
    }
  }, [isAuth, dowloadUserWords]);

  useEffect(() => {
    if (userWords[group] && userWords[group][page]) {
      if (bookPageWords?.length) {
        dispatch(addCurrentBookWords(bookPageWords.map((item:IWord) => findUserWord(item))));
      }
    } else if (bookPageWords?.length) {
      if (bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]));
    }
  }, [group, page, isAuth, bookPageWords, dispatch, findUserWord, userWords]);

  useEffect(() => {
    if (!isAuth) {
      if (bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]));
    }
  }, [bookPageWords, dispatch, isAuth]);

  return (
    <>
      <div className="book__loader">{isLoading && <Loader />}</div>
      <div className="book__cards">
        {wordsToRender?.length
          ? wordsToRender.map((word:IWord & IUserWord) => <CardWord key={word.id} word={word} />)
          : null}
      </div>
    </>
  );
};

export default TextbookContainer;
