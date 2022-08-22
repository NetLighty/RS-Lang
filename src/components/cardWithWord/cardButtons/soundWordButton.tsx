import React, { FC } from 'react';
import SETTINGS from '../../../utils/settings';

interface SoundButtonProps {
  audio: string;
  audioMeaning: string,
  audioExample: string,
  className: string
}

const SoundWordButton:FC<SoundButtonProps> = ({ audio, audioMeaning, audioExample,  className }) => {
  const player = new Audio();

  function handlePlayButton(sound:string, soundMeaning:string, soundExample:string) {
    if (player.paused) {
      player.src = sound;
      player.play().then(() => {}).catch(() => { player.pause(); });
    } else {
      player.pause();
    }
  }

  return (
    <button type="button" className={className} onClick={() => handlePlayButton(`${SETTINGS.BASE_URL}/${audio}`, `${SETTINGS.BASE_URL}/${audioMeaning}`,`${SETTINGS.BASE_URL}/${audioExample}`)} aria-label="Play" />
  );
};

export default SoundWordButton;
