import React from 'react';
import HardWordContainer from '~/components/hardWord/hardWord';
import Footer from '~/components/footer/footer';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';

import './hardWords.scss';

const result = window.location.origin;

const HardWords = () => (
  <>
    <div className="hard__words">
      <MainPageButton
        image={`${result}/src/assets/img/studybook.svg`}
        text={`${result}/src/assets/img/book-text.svg`}
        link="/book"
        classAdd="hard__words__link"
      />
      <HardWordContainer />
    </div>
    <div className="hard__footer">
      <Footer />
    </div>
  </>
);

export default HardWords;
