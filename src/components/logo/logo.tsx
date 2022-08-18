import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './logo.scss';

// eslint-disable-next-line react/function-component-definition
const Logo: FC = () => (
  <div className="logo">
    <NavLink className="logo__name" to="/">RSLang</NavLink>
  </div>
);

export default Logo;
