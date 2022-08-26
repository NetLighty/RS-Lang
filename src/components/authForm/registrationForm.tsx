import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import UserService from '~/api/userService';
import { RegistrationSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';

const result = window.location.origin;

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: FC = () => {
  const initialValues: RegistrationValues = { name: '', email: '', password: '' };
  return (
    <div className="auth">
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, actions) => {
          const regRes = await UserService.createUser(values.name, values.email, values.password);
          console.log(regRes);
          console.log(regRes.data);
          if (regRes.status === 200) {
            const loginRes = await UserService.signIn(values.email, values.password);
            console.log('LOGIN>>>?>?:????');
            console.log(loginRes);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form">
              <img className="form__img" src={`${result}/src/assets/img/enter.svg`} alt="planet" />
              <p className="form__text">Введите ваши данные</p>
              <div className="form__input-block">
                <Field name="name" className="form__email" placeholder="Name" />
                <div className="form__error-container">
                  {errors.name && touched.name ? (
                    <span className="form__error-message">{errors.name}</span>
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
                <button className="form__button-enter" type="submit">Регистрация</button>
              </div>
              <span>
                {'Есть аккаунт? - '}
                <a className="auth-link" href="/login">Войти</a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
