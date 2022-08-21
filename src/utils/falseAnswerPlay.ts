function falseAnswer(target: HTMLInputElement) {
  const audio = new Audio('https://promosounds.ru/wp-content/uploads/2021/10/standartnyy-zvuk-s-oshibochnym-otvetom.mp3');
  audio.play();
  target.classList.add('false-answer');
}

export default falseAnswer;
