import React, { FC } from 'react';

const result = window.location.origin;

<<<<<<< HEAD
const DifficultWordButton:FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button type="button" className="book__difficult__button" onClick={onClick}>
=======
const DifficultWordsButton = () => (
  <button type="button" className="book__difficult__button">
>>>>>>> parent of 002cbba (refactor: rename index.reducers.ts)
    <img src={`${result}/src/assets/img/saturn.svg`} alt="Difficult words" className="book__difficult__button__image" />
    <img src={`${result}/src/assets/img/difficult.svg`} alt="Difficult words" className="book__difficult__button__text" />
  </button>
);

export default DifficultWordButton;
