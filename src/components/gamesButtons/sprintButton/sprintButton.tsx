import React from 'react';

const result = window.location.origin;

const SprintButton = () => (
  <button type="button" className="book__sprint__button">
    <img
      src={`${result}/src/assets/img/sprintGame.svg`}
      alt="Sprint game"
      className="book__sprint__button__image"
    />
    <img
      src={`${result}/src/assets/img/sprintText.svg`}
      alt="Sprint game"
      className="book__sprint__button__text"
    />
  </button>
);

export default SprintButton;
