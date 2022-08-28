function trueAnswer(target: HTMLInputElement) {
  const audio = new Audio(
    'https://promosounds.ru/wp-content/uploads/2021/10/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1.mp3',
  );
  audio.play();
  target.classList.add('true-answer');
}

export default trueAnswer;
