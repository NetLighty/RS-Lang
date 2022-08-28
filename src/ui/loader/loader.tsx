import React, { FC } from 'react';
import './loader.scss';

// eslint-disable-next-line react/function-component-definition
const Loader: FC = () => (
  <p className="circle">
    <span className="ouro">
      <span className="left"><span className="anim" /></span>
      <span className="right"><span className="anim" /></span>
    </span>
  </p>
);

export default Loader;
