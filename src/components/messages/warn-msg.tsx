import React, { FC } from 'react';
import { MessageProps } from '~/ui/alertMessage/alertMessage';

const WarnMessage: FC<MessageProps> = ({ text }) => (
  <div className="warning-msg">
    <i className="fa fa-warning" />
    {text}
  </div>
);

export default WarnMessage;
