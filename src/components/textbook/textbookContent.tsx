import React from 'react';
import DifficultWordButton from '../difficultWordsButton/difficultWordsButton';
import AudioGameButton from '../gamesButtons/audioGameButton/audioGameButton';
import SprintButton from '../gamesButtons/sprintButton/sprintButton';
import GroupsBlock from '../groupsBlock/groupsBlock';
import Pagination from '../pagination/pagination';
import TextbookContainer from './textbookContainer';
import './textbook.scss';
import useSavePageToLocalStorage from '~/hooks/useSavePageToLocalStorage';

const TextbookContent = ():JSX.Element => {
  function displayDifficultWords() {
  // download difficult words and display them
  }

  const { savePageAndGoToGamePage } = useSavePageToLocalStorage();

  return (
    <div className="book__container">
      <div className="book__header">
        <GroupsBlock />
        <DifficultWordButton onClick={() => { displayDifficultWords(); }} />
      </div>
      <div className="book__cards__container">
        <TextbookContainer />
      </div>
      <div className="book__bottom">
        <Pagination />
        <div className="book__games">
          <AudioGameButton onClick={() => { savePageAndGoToGamePage('/audiocall'); }} />
          <SprintButton onClick={() => { savePageAndGoToGamePage('/sprint'); }} />
        </div>
      </div>
    </div>
  );
};

export default TextbookContent;
