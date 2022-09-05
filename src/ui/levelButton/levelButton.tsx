import React, { FC } from 'react';
import './levelButton.scss';

interface LevelButtonProps {
  addClass: string;
  text: string;
}

const LevelButton: FC<LevelButtonProps> = ({ addClass, text }) => (
  <div className={`level-button ${addClass}`}>{text}</div>
);

export default LevelButton;
