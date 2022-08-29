import React, { FC, useEffect, useState } from 'react';
import { IUserResponse } from '~/models/IUser';
import { getUserById } from '~/utils/setting.action';
import SETTINGS from '~/utils/settings';
import './userComponent.scss';

const result = window.location.origin;

const UserComponent: FC = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  let flag = true;
  async function getUser() {
    flag = false;
    const response = (await getUserById(SETTINGS.USER_ID, SETTINGS.TOKEN));
    console.log(response);
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
  }, []);
  return (
    <div className="user">
      <div className="user__content">
        <img className="user__content_img" src={`${result}/src/assets/img/avatar.png`} alt="avatar" />
        <div className="user__content_fild fild">
          <div className="fild__login">
            <p className="fild__login_descr">имя:</p>
            <input type="text" className="fild__login-input" disabled placeholder={login} />
            <div className="fild__login-edit edit _icon-pencil" />
          </div>
          <div className="fild__email">
            <p className="fild__email_descr">email:</p>
            <input type="text" className="fild__email-input" disabled placeholder={email} />
            <div className="fild__email-edit edit _icon-pencil" />
          </div>
        </div>
      </div>
      <div className="user__control">
        <button className="user__control_changeimg">сменить фото</button>
        <button className="user__control_exit">выйти</button>
      </div>
    </div>
  );
};

export default UserComponent;
