import React, { FC } from 'react';

const result = window.location.origin;

const SprintButton: FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button type='button' className='book__sprint__button' onClick={onClick}>
    <img
      src={`${result}/src/assets/img/sprintGame.svg`}
      alt='Sprint game'
      className='book__sprint__button__image'
    />
    <img
      src={`${result}/src/assets/img/sprintText.svg`}
      alt='Sprint game'
      className='book__sprint__button__text'
    />
  </button>
);

export default SprintButton;
