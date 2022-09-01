import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './mainPageButton.scss';

interface MainButtonProps {
  image: string;
  text: string;
  link: string;
  classAdd: string;
  // eslint-disable-next-line react/require-default-props
  changeModal?: () => void;
}

// eslint-disable-next-line react/function-component-definition
const MainButton: FC<MainButtonProps> = ({ image, text, link, classAdd, changeModal }) => (
  <NavLink to={link} className={classAdd} onClick={changeModal}>
    <div className={`${classAdd}round-button`}>
      <img className={`${classAdd}round-button__image`} src={image} alt="" />
      <img className={`${classAdd}round-button__text`} src={text} alt="" />
    </div>
  </NavLink>
);

export default MainButton;
