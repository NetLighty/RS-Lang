import React from 'react';

const result = window.location.origin;

<<<<<<< HEAD
<<<<<<< HEAD
const DifficultWordButton:FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button type="button" className="book__difficult__button" onClick={onClick}>
=======
const DifficultWordsButton = () => (
  <button type="button" className="book__difficult__button">
>>>>>>> parent of 002cbba (refactor: rename index.reducers.ts)
    <img src={`${result}/src/assets/img/saturn.svg`} alt="Difficult words" className="book__difficult__button__image" />
    <img src={`${result}/src/assets/img/difficult.svg`} alt="Difficult words" className="book__difficult__button__text" />
=======
const DifficultWordsButton = () => (
  <button type="button" className="book__difficult__button">
    <img
      src={`${result}/src/assets/img/saturn.svg`}
      alt="Difficult words"
      className="book__difficult__button__image"
    />
    <img
      src={`${result}/src/assets/img/difficult.svg`}
      alt="Difficult words"
      className="book__difficult__button__text"
    />
>>>>>>> parent of 9313ac7 (feat: rewrite difficultWordsbutton)
  </button>
);

export default DifficultWordsButton;
