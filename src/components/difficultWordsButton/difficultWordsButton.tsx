import React, { FC } from 'react';
import './difficultWordsButton.scss';

const DifficultWordButton: FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = ({ disabled, onClick }) => (
  <button type="button" className="book__difficult__button" disabled={disabled} onClick={onClick}>
    <img
      src={`./img/saturn.svg`}
      alt="Difficult words"
      className="book__difficult__button__image"
    />
    <img
      src={`./img/difficult.svg`}
      alt="Difficult words"
      className="book__difficult__button__text"
    />
    <div className="book__hint">Раздел доступен только зарегистрированным пользователям</div>
  </button>
);

export default DifficultWordButton;
