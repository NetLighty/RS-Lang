import React, { FC } from 'react';

const DifficultWordButton:FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button
    type="button"
    className="_icon-star card__button card__button__hard"
    aria-label="Hard button"
    onClick={onClick}
  />
);

export default DifficultWordButton;
