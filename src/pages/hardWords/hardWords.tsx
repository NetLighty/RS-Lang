import React from 'react';
import CardWord from '~/components/cardWithWord/cardWord';
import Footer from '~/components/footer/footer';
import Pagination from '~/components/pagination/pagination';
import { IUserWord } from '~/models/IUserWord';
import { IWord } from '~/models/IWord';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';

import './hardWords.scss';

const result = window.location.origin;

const HardWords = () => {
  const wordsToRender:Array<IWord & IUserWord> = [];

  return (
    <>
      <header>
        <MainPageButton image={`${result}/src/assets/img/studybook.svg`} text={`${result}/src/assets/img/book-text.svg`} link="/book" classAdd="hard__words__link" />
      </header>
      <div className="hard__words__cards">
        {wordsToRender?.length
          ? wordsToRender.map((word:IWord & IUserWord) => <CardWord key={word.id} word={word} />)
          : null}
      </div>
      <Pagination />
      <div className="hard__footer">
        <Footer />
      </div>
    </>
  );
};

export default HardWords;
