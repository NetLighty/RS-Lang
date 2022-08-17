import React, { FC } from 'react';
import './authForm.scss';

// eslint-disable-next-line react/function-component-definition
const AuthForm: FC = () => (
  <div className="form">
    <img className="form__img" src="../../assets/img/enter.svg" alt="planet" />
    <p className="form__text">Добро пожаловать в RSLang!</p>
    <input className="form__email" type="email" placeholder="введите email" />
    <input className="form__password" type="password" placeholder="введите пароль" />
    <div className="form__button">
      <button className="form__button-reg" type="submit">регистрация</button>
      <button className="form__button-enter" type="submit">вход</button>
    </div>
  </div>
);

export default AuthForm;
