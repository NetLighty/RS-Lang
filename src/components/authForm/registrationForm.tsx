import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registrationUser } from '~/api/controllers/userController';
import useActions from '~/hooks/useAction';
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
  const {
    setIsAuth, setError, setUser,
  } = useActions();
  const navigate = useNavigate();
  return (
    <div className="auth">
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, actions) => {
          const regRes = await registrationUser(values.name, values.email, values.password);
          console.log(regRes);
          if (regRes) {
            setUser({
              id: regRes.id, name: regRes.name,
            });
            setIsAuth(true);
            setError('');
            navigate('../');
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form">
              <img className="form__img" src={`${result}/src/assets/img/enter.svg`} alt="planet" />
              <p className="form__text">Введите ваши данные</p>
              <div className="form__input-block">
                <Field name="name" className="form__email" placeholder="Имя" />
                <div className="form__error-container">
                  {errors.name && touched.name ? (
                    <span className="form__error-message">{errors.name}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__input-block">
                <Field name="email" className="form__email" placeholder="Почта" />
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
                <button className="form__button-enter" type="submit">{ isSubmitting ? '...' : 'регистрация' }</button>
              </div>
              <span>
                {'Есть аккаунт? - '}
                <NavLink className="auth-link" to="/login">Войти</NavLink>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
