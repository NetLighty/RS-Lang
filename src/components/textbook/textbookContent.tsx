import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DifficultWordButton from '../difficultWordsButton/difficultWordsButton';
import AudioGameButton from '../gamesButtons/audioGameButton/audioGameButton';
import SprintButton from '../gamesButtons/sprintButton/sprintButton';
import GroupsBlock from '../groupsBlock/groupsBlock';
import Pagination from '../pagination/pagination';
import TextbookContainer from './textbookContainer';
import './textbook.scss';
import useSavePageToLocalStorage from '~/hooks/useSavePageToLocalStorage';
import { useAppSelector } from '~/hooks';
import { IWord } from '~/models/IWord';
import { IUserWord } from '~/models/IUserWord';
import SETTINGS from '~/utils/settings';

const TextbookContent = (): JSX.Element => {
  const navigate = useNavigate();
  const { savePageToLocalStore } = useSavePageToLocalStorage();
  const [disabled, setDisabled] = useState(true);
  const userId:string | null = localStorage.getItem('userId');
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const wordsToRender = useAppSelector((state) => state.textbook.bookWords);
  const [pageLearnedClass, setPageLearnedClass] = useState('');
  const [paginationLearnedClass, setPaginationLearnedClass] = useState('');
  const [gameDisabled, setGameDisabled] = useState(true);

  function savePageToLocalStoreAndGo(value: string) {
    savePageToLocalStore();
    navigate(`${value}`);
  }

  useEffect(() => {
    if (typeof userId === 'string') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userId]);

  useEffect(() => {
    if (isAuth) {
      let count = 0;
      const array = wordsToRender as Array<IWord & IUserWord>;
      array?.forEach((item) => {
        if (item.difficulty === SETTINGS.HARD_WORD || item.optional?.learned === true) {
          count += 1;
        }
      });
      if (count === SETTINGS.WORDS_ON_PAGE) {
        setPageLearnedClass('book__learned');
        setPaginationLearnedClass('book__pagination__learned');
        setGameDisabled(true);
        document.body.style.backgroundColor = 'grey';
      } else {
        setPageLearnedClass('');
        setPaginationLearnedClass('');
        setGameDisabled(false);
        document.body.style.backgroundColor = '#007A7A';
      }
    }
  }, [wordsToRender, isAuth]);

  return (
    <div className="book__container">
      <div className="book__header">
        <GroupsBlock />
        <DifficultWordButton
          disabled={disabled}
          onClick={() => {
            savePageToLocalStoreAndGo('/hardwords');
          }}
        />
      </div>
      <div className={`book__info ${pageLearnedClass}`}> ✓ страница изучена</div>
      <TextbookContainer />
      <div className="book__bottom">
        <Pagination learned={paginationLearnedClass} />
        <div className="book__games">
          <AudioGameButton
            disabled={gameDisabled}
            onClick={() => {
              savePageToLocalStoreAndGo('/audiocall/game');
            }}
          />
          <SprintButton
            disabled={gameDisabled}
            onClick={() => {
              savePageToLocalStoreAndGo('/sprint/game');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextbookContent;
