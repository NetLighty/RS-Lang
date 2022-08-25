import React from 'react';
import DifficultWordButton from '../difficultWordsButton/difficultWordsButton';
import AudioGameButton from '../gamesButtons/audioGameButton/audioGameButton';
import SprintButton from '../gamesButtons/sprintButton/sprintButton';
import GroupsBlock from '../groupsBlock/groupsBlock';
import Pagination from '../pagination/pagination';
import TextbookContainer from './textbookContainer';
import './textbook.scss';
import useSavePageToLocalStorage from '~/hooks/useSavePageToLocalStorage';
import { useNavigate } from 'react-router-dom';


const TextbookContent = ():JSX.Element => {
  const { savePageToLocalStore} = useSavePageToLocalStorage();
  const navigate = useNavigate();

  function displayDifficultWords() {
  // download difficult words and display them
  }

  function savePageToLocalStoreAndGo(value:string){
    savePageToLocalStore()
    navigate(`${value}`);
  }

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
          <AudioGameButton onClick={() => { savePageToLocalStoreAndGo('/audiocall'); }} />
          <SprintButton onClick={() => { savePageToLocalStoreAndGo('/sprint'); }} />
        </div>
      </div>
    </div>
  );
};

export default TextbookContent;
