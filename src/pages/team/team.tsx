import React, { FC } from 'react';
import Footer from '../../components/footer/footer';
import MemberTeam from '../../components/memberTeam/memberTeam';
import './team.scss';

const Team: FC = () => (
  <div className="team">
    <h2 className="team__header">Наша команда</h2>
    <div className="team__container">
      <MemberTeam
        name="Ушакова Мария"
        link="https://github.com/Mariia22"
        gitName="Mariia22"
        imgClass="mariia"
        description="Создала копию BackEnd. Разработала страницы учебника и раздел для сложных слов. Занималась вёрсткой карточек. Реализовала логику добавления слов в пользовательские и логику расчёта долгосрочной статистики."
      />
      <MemberTeam
        name="Александр Шукалович"
        link="https://github.com/NetLighty"
        gitName="Netlighty"
        imgClass="sasha"
        description="Создал базовую конфигурацию проекта. Написал основные методы обращения к API. Разработал авторизацию, мини-игру спринт. Добавил возможность смены-темы для приложения."
      />
      <MemberTeam
        name="Дереча Ирина"
        link="https://github.com/Irina05-04"
        gitName="Irina05-04"
        imgClass="irina"
        description="Разработала дизайн приложения. Занималась вёрсткой следующих страниц: главная, о команде, описание игр, статистика. Разработала мини-игру аудиовызов. Участвовала в составлении логики для пользовательских слов и статистики."
      />
    </div>
    <div className="team__footer">
      <Footer />
    </div>
  </div>
);

export default Team;
