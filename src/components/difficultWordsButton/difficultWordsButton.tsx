import React from 'react';
const result = window.location.origin;

const DifficultWordsButton = () => {
  return (
    <button className='book__difficult__button'>
      <img src={`${result}/src/assets/img/saturn.svg`}  alt="Difficult words" className='book__difficult__button__image'/>
      <img src={`${result}/src/assets/img/difficult.svg`}  alt="Difficult words" className='book__difficult__button__text' />
    </button>
  )
}

export default DifficultWordsButton;
