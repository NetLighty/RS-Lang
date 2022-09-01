import React, { FC } from 'react';
import { logoutUser } from '~/api/controllers/userController';
import useActions from '~/hooks/useAction';
import useGetUserWords from '~/hooks/useGetUserWords';
import './logoutButton.scss';

const logoutText = 'Выйти';

const LogoutButton: FC = () => {
  const { setIsAuth, setUser } = useActions();
  const { deleteUserWords } = useGetUserWords();

  const logout = () => {
    setIsAuth(false);
    logoutUser();
    setUser({
      id: '', name: '',
    });
    deleteUserWords();
  };

  return (
    <button onClick={logout} className="logout-button" type="button">{logoutText}</button>
  );
};

export default LogoutButton;
