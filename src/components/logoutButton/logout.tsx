import React, { FC } from 'react';
import useActions from '~/hooks/useActions';
import './logoutButton.scss';

const logoutText = 'Выйти';

const LogoutButton: FC = () => {
  const { setIsAuth, setUser } = useActions();
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser({
      id: '', name: '',
    });
  };
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button onClick={logout} className="logout-button" type="button">{logoutText}</button>
  );
};

export default LogoutButton;
