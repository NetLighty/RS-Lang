import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index-reducers';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from '../../models/IWord';
import { IUserWord } from '../../models/IUserWord';
import { addCurrentBookWords } from '../../store/textbook.actions';
import CardWord from '../cardWithWord/cardWord';
import useGetUserWords from '~/hooks/useGetUserWords';
import Loader from '~/ui/loader/loader';
import SETTINGS from '~/utils/settings';

const TextbookContainer:FC = () => {
  const { bookPageWords, getWords, isLoading } = useGetWords();
  const { dowloadUserWords, userWords } = useGetUserWords();
  const dispatch = useDispatch();
  const group = useSelector((state:RootState) => state.textbook.group);
  const page = useSelector((state:RootState) => state.textbook.page);
  const wordsToRender = useSelector((state:RootState) => state.textbook.bookWords);
  const isAuth = true;

  const findUserWord = useCallback((word:IWord) => {
    const currentUserWords = userWords[group][page];
    const currentWord = currentUserWords.find((item:IUserWord) => item.optional?.id === word.id);
    let newWord:IUserWord = {
      ...word,
      difficulty: SETTINGS.NORMAL_WORD,
      optional: {
        id: word.id,
        group: word.group,
        page: word.page,
        learned: false,
        result: false,
        success: 0,
        allAttemts: 0,
        dataupdate: '0',
        game: 'undefined',
        audiogame: '0',
        sprint: '0',
      },
    };
    if (currentWord) {
      newWord = {
        ...word,
        ...currentWord,
      };
    }
    return newWord;
  }, [group, page, userWords]);

  useEffect(() => {
    getWords(group, page);
  }, [group, page, getWords]);

  useEffect(() => {
    if (isAuth) {
      dowloadUserWords();
    }
  }, [isAuth, dowloadUserWords]);

  useEffect(() => {
    if (isAuth) {
      if (userWords[group] && userWords[group][page]) {
        if (bookPageWords?.length) {
          dispatch(addCurrentBookWords(bookPageWords.map((item:IWord) => findUserWord(item))));
        }
      } else if (bookPageWords?.length) {
        if (bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]));
      }
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
          ? wordsToRender.map((word:IWord) => <CardWord key={word.id} word={word} />)
          : null}
      </div>
    </>
  );
};

export default TextbookContainer;
