import getDocumentElement from './getDocumentElement';

function audioBlockButton() {
  const answer = getDocumentElement('.audiogame__translate_item');
  answer.map((item) => item.setAttribute('disabled', 'true'));
}

export default audioBlockButton;
