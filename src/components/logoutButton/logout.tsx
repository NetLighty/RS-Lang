import React, { FC } from 'react';
import { logoutUser } from '~/api/controllers/userController';
import useActions from '~/hooks/useAction';
import './logoutButton.scss';

const logoutText = 'Выйти';

const LogoutButton: FC = () => {
  const { setIsAuth, setUser } = useActions();

  const logout = () => {
    setIsAuth(false);
    logoutUser();
    setUser({
      id: '', name: '',
    });
  };

  return (
    <button onClick={logout} className="logout-button" type="button">{logoutText}</button>
  );
};

export default LogoutButton;
