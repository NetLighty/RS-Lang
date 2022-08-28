/* eslint-disable react/jsx-no-bind */
import React, { FC, useState } from 'react';
import './main.scss';
import '../../style/global.scss';
import MainPageButton from '../../ui/mainPageButton/mainPageButton';
import MyModal from '../../ui/myModal/myModal';
import AuthForm from '../../components/authForm/loginForm';
import Footer from '../../components/footer/footer';
import useTypedSelector from '~/hooks/useTypedSelector';

const result = window.location.origin;

// eslint-disable-next-line react/function-component-definition
const MainPage: FC = () => {
  const [modal, setModal] = useState(false);
  const { isAuth } = useTypedSelector((state) => state.auth);

  function changeModal(): void {
    setModal(true);
  }

  return (
    <div className="main">
      <div>
        { !isAuth ? <MyModal visible={modal} setVisible={setModal}><AuthForm /></MyModal> : null }
        <div className="main__container">
          <div className="content">
            <p className="content__description">
              Учить английский играя? Легко.
              Заходи каждый день, учи новые слова,
              запоминай их, играя в мини-игры.
              И у тебя всё получится.
            </p>
            <MainPageButton image={`${result}/src/assets/img/enter.svg`} text={`${result}/src/assets/img/enter-text.svg`} link="/" classAdd="enter-link" changeModal={changeModal} />
            <MainPageButton image={`${result}/src/assets/img/mini-games.svg`} text={`${result}/src/assets/img/miniGames-text.svg`} link="/games" classAdd="games-link" />
            <MainPageButton image={`${result}/src/assets/img/studybook.svg`} text={`${result}/src/assets/img/book-text.svg`} link="/book" classAdd="book-link" />
          </div>
        </div>
      </div>
      <div className="main__footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
