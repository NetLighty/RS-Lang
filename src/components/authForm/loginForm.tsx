import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '~/api/controllers/userController';
import useActions from '~/hooks/useAction';
import useGetUserWords from '~/hooks/useGetUserWords';
import useTypedSelector from '~/hooks/useTypedSelector';
import { LoginSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';

const result = window.location.origin;

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const {
    setIsAuth, setIsLoading, setError, setUser,
  } = useActions();
  const { error } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const initialValues: LoginValues = { email: '', password: '' };
  const { dowloadUserWords } = useGetUserWords();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loginRes = await loginUser(email, password);
      if (loginRes) {
        setUser({
          id: loginRes.id, name: loginRes.name,
        });
        setIsAuth(true);
        dowloadUserWords(loginRes.data.userId, loginRes.data.token);
        setError('');
        navigate('../');
      }
    } catch {
      setError('Некоректный логин или пароль');
    }
    setIsLoading(false);
  };
  return (
    <div className="auth">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          await login(values.email, values.password);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form">
              <img className="form__img" src={`${result}/src/assets/img/enter.svg`} alt="planet" />
              <p className="form__text">Добро пожаловать в RSLang!</p>
              <div className="form__input-block">
                <Field type="text" name="email" className="form__email" placeholder="введите email" autoComplete="off" />
                <div className="form__error-container">
                  {errors.email && touched.email ? (
                    <span className="form__error-message">{errors.email}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__input-block">
                <Field name="password" className="form__password" type="password" placeholder="введите пароль" autoComplete="off" />
                <div className="form__error-container">
                  {errors.password && touched.password ? (
                    <span className="form__error-message">{errors.password}</span>
                  ) : null}
                </div>
              </div>
              <div className="form__button">
                <button className="form__button-enter" type="submit">{ isSubmitting ? '...' : 'войти' }</button>
              </div>
              {error ? (
                <span className="form__error-message">{error}</span>
              ) : null}
              <span>
                {'Нет аккаунта? - '}
                <NavLink className="auth-link" to="/registration">Регистрация</NavLink>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
