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
  keys: string;
}

const DescriptionGame: FC<DescriptionGameProps> = ({
  name,
  text,
  addText,
  addClass,
  textButton,
  path,
  keys,
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
    <div className={`description-${addClass}__promt`}>
      <div className={`description-${addClass}__promt_content`}>
        Для управления клавиатурой используйте клавиши:
        {' '}
        {keys}
      </div>
      <div className={`description-${addClass}__promt_img`}> </div>
    </div>
  </div>
);

export default DescriptionGame;
