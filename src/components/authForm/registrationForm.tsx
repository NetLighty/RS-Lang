import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import { RegistrationSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';

const result = window.location.origin;

interface RegistrationValues {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm: FC = () => {
  const initialValues: RegistrationValues = { username: '', email: '', password: '' };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        console.log(actions);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form">
            <img className="form__img" src={`${result}/src/assets/img/enter.svg`} alt="planet" />
            <p className="form__text">Введите ваши данные</p>
            <div className="form__input-block">
              <Field name="username" className="form__email" placeholder="Username" />
              <div className="form__error-container">
                {errors.username && touched.username ? (
                  <span className="form__error-message">{errors.username}</span>
                ) : null}
              </div>
            </div>
            <div className="form__input-block">
              <Field name="email" className="form__email" placeholder="Email" />
              <div className="form__error-container">
                {errors.email && touched.email ? (
                  <span className="form__error-message">{errors.email}</span>
                ) : null}
              </div>
            </div>
            <div className="form__input-block">
              <Field name="password" className="form__password" type="password" placeholder="Пароль" />
              <div className="form__error-container">
                {errors.password && touched.password ? (
                  <span className="form__error-message">{errors.password}</span>
                ) : null}
              </div>
            </div>
            <div className="form__button">
              <button className="form__button-enter" type="submit">вход</button>
            </div>
            <a className="auth-link" href="./registration">Регистрация</a>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
