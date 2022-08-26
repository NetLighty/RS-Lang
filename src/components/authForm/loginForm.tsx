import {
  Field, Form, Formik,
} from 'formik';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '~/api/userService';
import { useAppDispatch } from '~/hooks';
import useTypedSelector from '~/hooks/useTypedSelector';
import AuthActionCreators from '~/store/reducers/auth/action-creators';
import { LoginSchema } from '~/utils/rules/authSchemas';
import './authForm.scss';

const result = window.location.origin;

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useTypedSelector((state) => state.auth);
  const initialValues: LoginValues = { email: '', password: '' };

  const login = async (email: string, password: string) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const loginRes = await UserService.signIn(email, password);
      if (loginRes.status === 200) {
        document.cookie = `token=${loginRes.data.token}; secure; sameSite=strict`;
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', loginRes.data.name);
        dispatch(AuthActionCreators.setUser({
          id: loginRes.data.userId, name: loginRes.data.name,
        }));
        dispatch(AuthActionCreators.setIsAuth(true));
        dispatch(AuthActionCreators.setError(''));
      } else {
        /* dispatch(AuthActionCreators.setError('Некорректный логин или пароль')); */
      }
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
    }
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
                <button className="form__button-enter" type="submit">{ isSubmitting ? 'загрузка' : 'войти' }</button>
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
