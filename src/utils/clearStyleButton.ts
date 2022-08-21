import getDocumentElement from './getDocumentElement';

function clearStyleButton() {
  const answer = getDocumentElement('.audiogame__translate_item');
  answer.forEach((item) => {
    item.classList.remove('true-answer');
    item.classList.remove('false-answer');
    item.classList.remove('choose-answer');
    item.removeAttribute('disabled');
  });
}

export default clearStyleButton;
