import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index.reducers';
import useGetWords from '../../hooks/useGetWords';
import { IWord } from '../../models/IWord';
import { addCurrentBookWords } from '../../store/textbook.actions';
import CardWord from '../cardWithWord/cardWord';
import useGetUserWords from '~/hooks/useGetUserWords';
import Loader from '~/ui/loader/loader';

const TextbookContainer:FC = () => {
  const { bookPageWords, getWords, isLoading } = useGetWords();
  const { dowloadUserWords } = useGetUserWords();
  const dispatch = useDispatch();
  const group = useSelector((state:RootState) => state.textbook.group);
  const page = useSelector((state:RootState) => state.textbook.page);
  const wordsToRender = useSelector((state:RootState) => state.textbook.bookWords);
  const isAuth = true;
  // 1. загрузила общие слова по странице и группе
  // 2. загрузила все слова пользователя
  // (грузим один раз при инициализации, все остальные действия изменяют его)
  // 3. надо объединить слова. Взять значение difficulty
  // (если трудное, то звездочку отрисовывать желтым), взять значение
  // learned, success, allAttemts.
  // 4. записать их в bookPageWords
  // 5. это должно вызвать перезапись wordsToRender
  // 6. отрисовать в макете карточки новые значения

  useEffect(() => {
    getWords(group, page);
  }, [group, page, getWords]);

  useEffect(() => {
    if (isAuth) {
      dowloadUserWords();
    }
  }, [isAuth, dowloadUserWords]);

  useEffect(() => {
    if (bookPageWords?.length) dispatch(addCurrentBookWords([...bookPageWords]));
  }, [bookPageWords, dispatch]);

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
