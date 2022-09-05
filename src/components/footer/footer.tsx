import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

// eslint-disable-next-line react/function-component-definition
const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__about">
      <span>©2022 RS LANG.&nbsp;</span>
      <a href="https://rs.school/js/">RS School JS Course.</a>
    </div>
    <NavLink to="/team" className="footer__link _icon-team">
      <div className="footer__link_circular round">
        <svg className="round__svg" viewBox="0 0 100 100" fill="none">
          <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
          <text>
            <textPath className="round__svg_text" xlinkHref="#circle">&nbsp;&nbsp; наша команда</textPath>
          </text>
        </svg>
      </div>
    </NavLink>
  </footer>
);

export default Footer;
