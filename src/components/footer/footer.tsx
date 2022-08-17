import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

// eslint-disable-next-line react/function-component-definition
const Footer: FC = () => (
  <footer className="footer">
    <div className="footer__about">
      <a className="footer__about_logo" href="https://rs.school/js/" type="blank"> </a>
      <h3 className="footer__about_year">2022</h3>
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