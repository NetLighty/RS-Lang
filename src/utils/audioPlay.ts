import { IWord } from '../models/IWord';

function audioPlay(curr: IWord) {
  const audio = new Audio(`https://rs-lang-team148.herokuapp.com/${curr.audio}`);
  audio.play();
}

export default audioPlay;
