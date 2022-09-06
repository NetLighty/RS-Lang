import React, { FC } from 'react';

const AudioGameButton: FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = ({ disabled, onClick }) => (
  <button type="button" className="book__audioGame__button" onClick={onClick} disabled={disabled}>
    <img
      src={`./img/audioGame.svg`}
      alt="Audio game"
      className="book__audioGame__button__image"
    />
    <img
      src={`./img/audioText.svg`}
      alt="Audio game"
      className="book__audioGame__button__text"
    />
    <div className="book__audioGame__hint">
      Все слова на этой странице выучены либо отмечены как сложные
    </div>
  </button>
);

export default AudioGameButton;
