import React, { FC } from 'react';
import useTheme from '~/hooks/useTheme';
import './fullscreenButton.scss';

// eslint-disable-next-line react/function-component-definition
const FullScreenButton: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={changeTheme} className="fullscreen__button" type="button">
    </button>
  );
};

export default FullScreenButton;
