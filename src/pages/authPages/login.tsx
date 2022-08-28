import React, { FC } from 'react';
import LoginForm from '~/components/authForm/loginForm';
import './authBlock.scss';

const LoginPage: FC = () => (
  <div className="auth-block">
    <LoginForm />
  </div>
);

export default LoginPage;
