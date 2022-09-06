import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser, registrationUser } from '~/api/controllers/userController';
import useActions from '~/hooks/useAction';
import useTypedSelector from '~/hooks/useTypedSelector';
import { errorRegistrationMsg } from '~/utils/auth';
import { RegistrationSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';


interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: FC = () => {
  const initialValues: RegistrationValues = { name: '', email: '', password: '' };
  const {
    setIsAuth, setUser, setRegistrationError,
  } = useActions();
  const { regError } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = () => {
    setRegistrationError('');
  };
  return (
    <div className="auth">
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, actions) => {
          try {
            const regRes = await registrationUser(values.name, values.email, values.password);
            const loginRes = await loginUser(regRes.data.email, values.password);
            if (loginRes) {
              setUser({
                id: loginRes.id, name: loginRes.name,
              });
              setIsAuth(true);
              setRegistrationError('');
              navigate('../');
            }
          } catch {
            setRegistrationError(errorRegistrationMsg);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form">
              <img className="form__img" src={`./img/enter.svg`} alt="planet" />
              <p className="form__text">Добро пожаловать в RSLang!</p>
              <div className="form__input-block">
                <Field name="name" className="form__email" placeholder="Введите имя" />
                <div className="form__error-container">
                  {errors.name && touched.name ? (
                    <span className="form__error-message">{errors.name}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__input-block">
                <Field onInput={handleChange} name="email" className="form__email" placeholder="Введите email" />
                <div className="form__error-container">
                  {errors.email && touched.email ? (
                    <span className="form__error-message">{errors.email}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__input-block">
                <Field name="password" className="form__password" type="password" placeholder="Введите пароль" />
                <div className="form__error-container">
                  {errors.password && touched.password ? (
                    <span className="form__error-message">{errors.password}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__error-container">
                {regError ? (
                  <span className="form__error-message">{regError}</span>
                ) : null}
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
