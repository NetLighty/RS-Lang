import React, { FC } from 'react';
import { MessageProps } from '~/ui/alertMessage/alertMessage';

const WarnMessage: FC<MessageProps> = ({ text }) => (
  <div className="error-msg">
    <i className="fa fa-times-circle" />
    {text}
  </div>
);

export default WarnMessage;
