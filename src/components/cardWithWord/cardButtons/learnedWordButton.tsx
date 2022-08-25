import React, { FC } from 'react';

const LearnedWordButton:
FC<{
  classString:string,
  onClick: React.MouseEventHandler<HTMLElement> }> = ({ classString, onClick }) => (
    <button
      onClick={onClick}
      type="button"
      className={`_icon-book card__button card__button__learned ${classString}`}
      id="learned__button"
      aria-label="I know this word"
    />
);

export default LearnedWordButton;
