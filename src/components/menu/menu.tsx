import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.scss';

const Menu = () => (
  <nav className="menu">
    <NavLink to="/" className="_icon-home menu__item" />
    <NavLink to="/book" className="_icon-book menu__item" />
    <NavLink to="/games" className="_icon-play menu__item" />
    <NavLink to="/statistic" className="_icon-statistic menu__item" />
  </nav>
);

export default Menu;
