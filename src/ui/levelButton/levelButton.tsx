import React, { FC, useState } from 'react';
import './levelButton.scss';

interface LevelButtonProps {
  addClass: string;
  text: string;
}

// eslint-disable-next-line react/function-component-definition
const LevelButton: FC<LevelButtonProps> = ({ addClass, text }) => (
  <div className={`level-button ${addClass}`}>{text}</div>
);

export default LevelButton;
