import React from 'react';
const result = window.location.origin;
const LearnedWordButton = () => {
  return (
    <button>
      <img src={`${result}/src/assets/img/check.svg`} alt="I know this word" className="card__button card__button__learned" />
    </button>
  )
}

export default LearnedWordButton;
