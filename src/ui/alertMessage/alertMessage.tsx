import React, { FC, ReactNode } from 'react';
import './alertMessage.scss';

export interface MessageProps {
  text: string;
}

export interface AlertMessageProps {
  children: ReactNode;
}

const AlertMessage: FC<AlertMessageProps> = ({ children }) => (
  <div className="alert-message">
    {children}
  </div>
);

export default AlertMessage;
