import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import useTypedSelector from '~/hooks/useTypedSelector';
import LogoutButton from '../logoutButton/logout';
import './logo.scss';

const Logo: FC = () => {
  const { user, isAuth } = useTypedSelector((state) => state.auth);
  return (
    <div>
      <div className="logo__img" />
      <div className="logo">
        <NavLink className="logo__name" to="/">
          RSLang
          { user.name ? `( ${user.name} )` : '' }
        </NavLink>
        { isAuth ? <LogoutButton /> : null}
      </div>
    </div>
  );
};

export default Logo;
