import React from 'react';
import HardWordContainer from '~/components/hardWord/hardWord';
import Footer from '~/components/footer/footer';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';

import './hardWords.scss';

const result = window.location.origin;

const HardWords = () => (
  <>
    <div className="hard__container">
      <MainPageButton
        image={`${result}/src/assets/img/small-book.svg`}
        text={`${result}/src/assets/img/small-book-line.svg`}
        link="/book"
        classAdd="hard__words__link"
      />
      <HardWordContainer />
    </div>
    <Footer />
  </>
);

export default HardWords;
