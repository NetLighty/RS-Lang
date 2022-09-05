import { IWord } from '~/models/IWord';

export const appPath = window.location.origin;

export function sound(path: string) {
  const audio = new Audio();
  audio.src = path;
  audio.autoplay = true;
}

export function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function alternativeShuffle(array: IWord[]) {
  const shuffledArray = array;
  let currentIndex = shuffledArray.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [shuffledArray[currentIndex],
      shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
}

export function getDocumentElement(name: string) {
  return [...document.querySelectorAll(name)] as HTMLElement[];
}

export function generateNum(limit: number) {
  return Math.floor(Math.random() * limit);
}

export function falseAnswer(target: HTMLInputElement) {
  const audio = new Audio('https://promosounds.ru/wp-content/uploads/2021/10/standartnyy-zvuk-s-oshibochnym-otvetom.mp3');
  audio.play();
  target.classList.add('false-answer');
}

export function trueAnswer(target: HTMLInputElement) {
  const audio = new Audio('https://promosounds.ru/wp-content/uploads/2021/10/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1.mp3');
  audio.play();
  target.classList.add('true-answer');
}

export function chooseKeyDown(event: KeyboardEvent) {
  switch (event.keyCode) {
    case 32: getDocumentElement('.audiogame__recoder')[0].click(); break;
    case 49: getDocumentElement('.audiogame__translate_item')[0].click(); break;
    case 50: getDocumentElement('.audiogame__translate_item')[1].click(); break;
    case 51: getDocumentElement('.audiogame__translate_item')[2].click(); break;
    case 52: getDocumentElement('.audiogame__translate_item')[3].click(); break;
    case 53: getDocumentElement('.audiogame__translate_item')[4].click(); break;
    default: event.stopPropagation();
  }
}
