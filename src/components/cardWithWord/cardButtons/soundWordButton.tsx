import React, { FC } from 'react';
import SETTINGS from '../../../utils/settings';

interface SoundButtonProps {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  className: string;
}

const SoundWordButton: FC<SoundButtonProps> = ({
  audio,
  audioMeaning,
  audioExample,
  className,
}) => {
  const player = new Audio();
  let nextStep: number;
  let nextSound: string;

  function handlePlayButton(sound: string, step: number) {
    player.src = `${SETTINGS.BASE_URL}/${sound}`;
    player.load();
    player
      .play()
      .then(() => {})
      .catch(() => player.pause());
    if (step === 1) {
      nextStep = 2;
      nextSound = audioMeaning;
    }
    if (step === 2) {
      nextStep = 3;
      nextSound = audioExample;
    }
    if (step === 3) {
      return;
    }

    function playNext() {
      player.removeEventListener('ended', playNext);
      handlePlayButton(nextSound, nextStep);
    }
    player.addEventListener('ended', playNext);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => handlePlayButton(audio, 1)}
      aria-label="Play"
    />
  );
};

export default SoundWordButton;
