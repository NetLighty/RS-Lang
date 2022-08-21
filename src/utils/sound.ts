function sound(path: string) {
  const audio = new Audio();
  audio.src = path;
  audio.autoplay = true;
}

export default sound;
