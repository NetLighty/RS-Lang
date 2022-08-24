import React from 'react';
import DifficultWordsButton from '../difficultWordsButton/difficultWordsButton';
import AudioGameButton from '../gamesButtons/audioGameButton/audioGameButton';
import SprintButton from '../gamesButtons/sprintButton/sprintButton';
import GroupsBlock from '../groupsBlock/groupsBlock';
import Pagination from '../pagination/pagination';
import TextbookContainer from './textbookContainer';
import './textbook.scss';

const TextbookContent = ():JSX.Element => (
  <div className="book__container">
    <div className="book__header">
      <GroupsBlock />
      <DifficultWordsButton />
    </div>
    <div className="book__cards">
      <TextbookContainer />
    </div>
    <div className="book__footer">
      <Pagination />
      <div className="book__games">
        <AudioGameButton />
        <SprintButton />
      </div>
    </div>
  </div>
);

export default TextbookContent;
