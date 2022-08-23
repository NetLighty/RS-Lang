import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './logo.scss';

const Logo: FC = () => (
  <div className="logo">
    <NavLink className="logo__name" to="/">RSLang</NavLink>
  </div>
);

export default Logo;
