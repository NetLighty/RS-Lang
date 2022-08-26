import React, { FC } from 'react';
import RegistrationForm from '~/components/authForm/registrationForm';
import './authBlock.scss';

const RegistrationPage: FC = () => (
  <div className="auth-block">
    <RegistrationForm />
  </div>
);

export default RegistrationPage;
