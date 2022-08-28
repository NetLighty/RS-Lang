import React, { FC } from 'react';

interface PaginationWordProps {
  text: string;
  direction: string;
  disabledValue?: boolean;
}

const PaginationButton: FC<PaginationWordProps> = ({ text, direction, disabledValue }) => (
  <button
    type='button'
    className='book__pagination__button'
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
