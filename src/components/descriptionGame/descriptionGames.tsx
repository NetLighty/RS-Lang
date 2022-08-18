import React, { FC } from 'react';
import './descriptionGame.scss';

interface DescriptionGameProps {
  name: string;
  text: string;
  addText: string;
  addClass: string;
}

// eslint-disable-next-line react/function-component-definition
const DescriptionGame: FC<DescriptionGameProps> = ({
  name, text, addText, addClass,
}) => (
  <div className={`description ${addClass}`}>
    <div className={`description__content ${addClass}`}>
      <h3 className="description__content_header">{name}</h3>
      <p className="description__content_text">{text}</p>
      <p className="description__content_text">{addText}</p>
    </div>
  </div>
);

export default DescriptionGame;
