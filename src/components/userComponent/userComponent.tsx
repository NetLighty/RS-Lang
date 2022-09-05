import React, { FC, useEffect, useState } from 'react';
import { IUserResponse } from '~/models/IUser';
// eslint-disable-next-line import/extensions
import { getUserById } from '~/utils/setting.action';
import { showForm, updateUser } from '~/utils/updateUser';
import './userComponent.scss';

const result = window.location.origin;

const UserComponent: FC = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  let flag = true;
  async function getUser() {
    flag = false;
    const response = (await getUserById(localStorage.getItem('userId') as string));
    const data: IUserResponse = response as IUserResponse;
    setLogin(data.name);
    setEmail(data.email);
  }
  useEffect(() => {
    if (flag === true) {
      getUser()
        .then(
          () => {},
          () => {},
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user">
      <div className="user__content">
        <img className="user__content_img" src={`${result}/src/assets/img/avatar.png`} alt="avatar" />
        <div className="user__content_fild fild">
          <div className="fild__login">
            <p className="fild__login_descr">имя:</p>
            <input type="text" className="fild__login-input" disabled value={login} />
          </div>
          <div className="fild__email">
            <p className="fild__email_descr">email:</p>
            <input type="text" className="fild__email-input" disabled placeholder={email} />
          </div>
          <input type="password" className="fild__password" placeholder="введите новый пароль" />
        </div>
      </div>
      <div className="user__control">
        <button className="user__control_change" type="button" onClick={() => { showForm(); }}>редактировать</button>
        <button
          className="save-updateuser"
          type="button"
          onClick={() => {
            updateUser(localStorage.getItem('userId') as string)
              .then(
                () => {},
                () => {},
              );
          }}
        >
          сохранить
        </button>
        <button className="user__control_exit" type="button">выйти</button>
      </div>
    </div>
  );
};

export default UserComponent;
