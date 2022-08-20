import React, { FC } from 'react';
import StartGame from '../../ui/startGame/startGame';
import './descriptionGame.scss';

interface DescriptionGameProps {
  name: string;
  text: string;
  addText: string;
  addClass: string;
  textButton: string;
  path: string;
}

// eslint-disable-next-line react/function-component-definition
const DescriptionGame: FC<DescriptionGameProps> = ({
  name, text, addText, addClass, textButton, path,
}) => (
  <div className={`description description-${addClass}`}>
    <div className={`description__content description-${addClass}__content`}>
      <h3 className="description__content_header">{name}</h3>
      <p className="description__content_text">{text}</p>
      <p className="description__content_text">{addText}</p>
    </div>
    <div className={`description-${addClass}__button`}>
      <StartGame text={textButton} path={path} />
    </div>
  </div>
);

export default DescriptionGame;
