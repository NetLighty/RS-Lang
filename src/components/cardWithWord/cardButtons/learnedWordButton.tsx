import React, { FC } from 'react';

const LearnedWordButton:FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="_icon-book card__button"
    id="learned__button"
    aria-label="I know this word"
  />
);

export default LearnedWordButton;
