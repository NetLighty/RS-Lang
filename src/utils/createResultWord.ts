function createResultWord(word: string, translate: string, audio: string, answer: boolean) {
  return {
    word,
    translate,
    audio,
    answer,
  };
}

export default createResultWord;
