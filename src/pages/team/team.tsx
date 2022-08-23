import React, { FC } from 'react';
import Footer from '../../components/footer/footer';
import MemberTeam from '../../components/memberTeam/memberTeam';
import './team.scss';

// eslint-disable-next-line react/function-component-definition
const Team: FC = () => (
  <div className="team">
    <h2 className="team__header">Наша команда</h2>
    <div className="team__container">
      <MemberTeam
        name="Ушакова Мария"
        link="https://github.com/Mariia22"
        gitName="Mariia22"
        imgClass="mariia"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of t"
      />
      <MemberTeam
        name="Александр Шукалович"
        link="https://github.com/NetLighty"
        gitName="Netlighty"
        imgClass="sasha"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of t"
      />
      <MemberTeam
        name="Дереча Ирина"
        link="https://github.com/Irina05-04"
        gitName="Irina05-04"
        imgClass="irina"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of t"
      />
    </div>
    <div className="team__footer">
      <Footer />
    </div>
  </div>
);

export default Team;
