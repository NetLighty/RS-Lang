import React, { FC, useState } from 'react';
import './userComponent.scss';

const UserComponent: FC = () => {
  const [user, setUser] = useState(0);
  return (
    <div className="user" />
  );
};

export default UserComponent;
