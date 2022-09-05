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
    <svg
      className="description__background-img"
      width="396"
      height="227"
      viewBox="0 0 396 227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" width="356" height="215" rx="4" />
      <path
        className="description__background-img"
        d="M45.5 155.5C31.1 165.1 9.5 206.833 0.5 226.5C16.5 206.1 37.1667 203.667 45.5 205C51.5 184.5 59.9 145.9 45.5 155.5Z"
      />
    </svg>
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
        Для управления клавиатурой используйте:
        {' '}
        {keys}
      </div>
      <div className={`description-${addClass}__promt_img`}> </div>
    </div>
  </div>
);

export default DescriptionGame;
