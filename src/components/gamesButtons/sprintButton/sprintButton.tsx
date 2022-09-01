import React, { FC } from 'react';

const result = window.location.origin;

const SprintButton: FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = ({ disabled, onClick }) => (
  <button type="button" className="book__sprint__button" disabled={disabled} onClick={onClick}>
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
    <div className="book__sprint__hint">
      Все слова на этой странице выучены либо отмечены как сложные
    </div>
  </button>
);

export default SprintButton;
