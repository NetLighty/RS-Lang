import React from 'react';
import HardWordContainer from '~/components/hardWord/hardWord';
import Footer from '~/components/footer/footer';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';
import './hardWords.scss';

const HardWords = () => (
  <>
    <div className="hard">
      <div className="hard__container">
        <MainPageButton
          image={`./img/small-book.svg`}
          text={`./img/small-book-line.svg`}
          link="/book"
          classAdd="hard__words__link"
        />
        <HardWordContainer />
      </div>
    </div>
    <Footer />
  </>
);

export default HardWords;
