import React, { FC } from 'react';
import './fullscreenButton.scss';

// eslint-disable-next-line react/function-component-definition
const FullScreenButton: FC = () => {
  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <button onClick={fullScreen} className="fullscreen__button" type="button">
      <svg className="fullscreen__img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
      </svg>
    </button>
  );
};

export default FullScreenButton;
