import React, { FC } from 'react';
import { MessageProps } from '~/ui/alertMessage/alertMessage';

const WarnMessage: FC<MessageProps> = ({ text }) => (
  <div className="success-msg">
    <i className="fa fa-check" />
    {text}
  </div>
);

export default WarnMessage;
