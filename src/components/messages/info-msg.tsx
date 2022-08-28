import React, { FC } from 'react';
import { MessageProps } from '~/ui/alertMessage/alertMessage';

const WarnMessage: FC<MessageProps> = ({ text }) => (
  <div className="info-msg">
    <i className="fa fa-info-circle" />
    {text}
  </div>
);

export default WarnMessage;
