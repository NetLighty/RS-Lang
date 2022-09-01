import React, { FC } from 'react';

interface PaginationWordProps {
  text: string;
  direction: string;
  disabledValue?: boolean;
  learned: string;
}

const PaginationButton: FC<PaginationWordProps> = ({ text, direction, disabledValue, learned }) => (
  <button
    type="button"
    className={`book__pagination__button ${learned}`}
    data-direction={direction}
    disabled={disabledValue}
  >
    {text}
  </button>
);

PaginationButton.defaultProps = {
  disabledValue: false,
};

export default PaginationButton;
