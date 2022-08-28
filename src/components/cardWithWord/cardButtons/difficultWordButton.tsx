import React, { FC } from 'react';

const DifficultWordButton: FC<{
  classString: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}> = ({ classString, onClick }) => (
  <button
    type='button'
    className={`_icon-star card__button card__button__hard ${classString}`}
    aria-label='Hard button'
    onClick={onClick}
  />
);

export default DifficultWordButton;
