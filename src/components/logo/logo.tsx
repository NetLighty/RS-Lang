import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import useTypedSelector from '~/hooks/useTypedSelector';
import { store } from '~/store';
import './logo.scss';

const Logo: FC = () => {
  const { name } = useTypedSelector((state) => state.auth.user);
  return (
    <div className="logo">
      <NavLink className="logo__name" to="/">
        RSLang (
        {name}
        )
      </NavLink>
    </div>
  );
};

export default Logo;
