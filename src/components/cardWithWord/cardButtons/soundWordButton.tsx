import React, { FC } from 'react';
import SETTINGS from '../../../utils/settings';

interface SoundButtonProps {
  audio: string;
  className: string
}

const SoundWordButton:FC<SoundButtonProps> = ({ audio, className }) => {
  const player = new Audio();

  function handlePlayButton(sound:string) {
    if (player.paused) {
      player.src = sound;
      player.play().then(() => {}).catch(() => { player.pause(); });
    } else {
      player.pause();
    }
  }

  return (
    <button type="button" className={className} onClick={() => handlePlayButton(`${SETTINGS.BASE_URL}/${audio}`)} aria-label="Play" />
  );
};

export default SoundWordButton;
