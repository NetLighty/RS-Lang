/* eslint-disable react/jsx-no-bind */
import React, { FC, useState } from 'react';
import './main.scss';
import '../../style/global.scss';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';
import MyModal from '../../ui/myModal/myModal';
import AuthForm from '../../components/authForm/authForm';
import enter from '../../assets/img/enter.svg';
import enterText from '../../assets/img/enter-text.svg'
import games from '../../assets/img/mini-games.svg';
import gamesText from '../../assets/img/miniGames-text.svg';
import book from '../../assets/img/studybook.svg';
import bookText from '../../assets/img/book-text.svg';

// eslint-disable-next-line react/function-component-definition
const MainPage: FC = () => {
  const [modal, setModal] = useState(false);

  function changeModal(): void {
    setModal(true);
  }

  return (
    <div className="main">
      <MyModal visible={modal} setVisible={setModal}><AuthForm /></MyModal>
      <div className="main__container">
        <div className="content">
          <p className="content__description">
            Учить английский играя? Легко.
            Заходи каждый день, учи новые слова,
            запоминай их, играя в мини-игры.
            И у тебя всё получится.
          </p>
          <MainPageButton image={enter} text={enterText} link="/" classAdd="enter-link" changeModal={changeModal} />
          <MainPageButton image={games} text={gamesText} link="/games" classAdd="games-link" />
          <MainPageButton image={book} text={bookText} link="/book" classAdd="book-link" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
