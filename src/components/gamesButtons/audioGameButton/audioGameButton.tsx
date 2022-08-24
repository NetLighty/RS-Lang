import React, { FC } from 'react';

const result = window.location.origin;

const AudioGameButton:FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button type="button" className="book__audioGame__button" onClick={onClick}>
    <img src={`${result}/src/assets/img/audioGame.svg`} alt="Audio game" className="book__audioGame__button__image" />
    <img src={`${result}/src/assets/img/audioText.svg`} alt="Audio game" className="book__audioGame__button__text" />
  </button>
);

export default AudioGameButton;
