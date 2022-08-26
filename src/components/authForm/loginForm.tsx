import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import UserService from '~/api/userService';
import UserWordService from '~/api/userWordsService';
import getCookie, { accesTokenName } from '~/utils/cookie';
import { LoginSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';

const result = window.location.origin;

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const initialValues: LoginValues = { email: '', password: '' };
  return (
    <div className="auth">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          console.log(actions);
          const loginRes = await UserService.signIn(values.email, values.password);
          console.log(loginRes);
          if (loginRes.status === 200) {
            document.cookie = `token=${loginRes.data.token}; secure; sameSite=strict`;
            const accesToken = getCookie(accesTokenName);
            console.log('acessToken');
            console.log(accesToken);
            const wordsRes = await UserWordService.getAllUserWords(
              loginRes.data.userId,
              accesToken,
            );
            console.log(wordsRes.data);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form">
              <img className="form__img" src={`${result}/src/assets/img/enter.svg`} alt="planet" />
              <p className="form__text">Добро пожаловать в RSLang!</p>
              <div className="form__input-block">
                <Field name="email" className="form__email" placeholder="введите email" />
                <div className="form__error-container">
                  {errors.email && touched.email ? (
                    <span className="form__error-message">{errors.email}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__input-block">
                <Field name="password" className="form__password" type="password" placeholder="введите пароль" />
                <div className="form__error-container">
                  {errors.password && touched.password ? (
                    <span className="form__error-message">{errors.password}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__button">
                <button className="form__button-enter" type="submit">вход</button>
              </div>
              <span>
                {'Нет аккаунта? - '}
                <a className="auth-link" href="/registration">Регистрация</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
