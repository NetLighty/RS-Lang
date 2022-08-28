import React, { FC } from 'react';
import './memberTeam.scss';

interface MemberTeamProps {
  name: string;
  link: string;
  gitName: string;
  imgClass: string;
  description: string;
}

const MemberTeam: FC<MemberTeamProps> = ({
  name, link, gitName, imgClass, description,
}) => (
  <div className="member">
    <div className={`member__img ${imgClass}`} />
    <a className="member__link" href={link}>
      {gitName}
    </a>
    <h3 className="memmber__name">{name}</h3>
    <p className="member__description">{description}</p>
  </div>
);

export default MemberTeam;
