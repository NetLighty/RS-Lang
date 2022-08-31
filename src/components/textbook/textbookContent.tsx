import React from 'react';
import { useNavigate } from 'react-router-dom';
import DifficultWordButton from '../difficultWordsButton/difficultWordsButton';
import AudioGameButton from '../gamesButtons/audioGameButton/audioGameButton';
import SprintButton from '../gamesButtons/sprintButton/sprintButton';
import GroupsBlock from '../groupsBlock/groupsBlock';
import Pagination from '../pagination/pagination';
import TextbookContainer from './textbookContainer';
import './textbook.scss';
import useSavePageToLocalStorage from '~/hooks/useSavePageToLocalStorage';

const TextbookContent = (): JSX.Element => {
  const navigate = useNavigate();
  const { savePageToLocalStore } = useSavePageToLocalStorage();

  function savePageToLocalStoreAndGo(value: string) {
    savePageToLocalStore();
    navigate(`${value}`);
  }

  return (
    <div className="book__container">
      <div className="book__header">
        <GroupsBlock />
        <DifficultWordButton
          onClick={() => {
            savePageToLocalStoreAndGo('/hardwords');
          }}
        />
      </div>
      <div className="book__cards__container">
        <TextbookContainer />
      </div>
      <div className="book__bottom">
        <Pagination />
        <div className="book__games">
          <AudioGameButton
            onClick={() => {
              savePageToLocalStoreAndGo('/audiocall/game');
            }}
          />
          <SprintButton
            onClick={() => {
              savePageToLocalStoreAndGo('/sprint');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextbookContent;
