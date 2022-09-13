import React, { FC } from 'react';


const SprintButton: FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = ({ disabled, onClick }) => (
  <button type="button" className="book__sprint__button" disabled={disabled} onClick={onClick}>
    <img
      src={`./img/sprintGame.svg`}
      alt="Sprint game"
      className="book__sprint__button__image"
    />
    <img
      src={`./img/sprintText.svg`}
      alt="Sprint game"
      className="book__sprint__button__text"
    />
    <div className="book__sprint__hint">
      Все слова на этой странице выучены либо отмечены как сложные
    </div>
  </button>
);

export default SprintButton;
