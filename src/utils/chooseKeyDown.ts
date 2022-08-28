import getDocumentElement from './getDocumentElement';

function chooseKeyDown(event: KeyboardEvent) {
  switch (event.keyCode) {
    case 49: getDocumentElement('.audiogame__translate_item')[0].click(); break;
    case 50: getDocumentElement('.audiogame__translate_item')[1].click(); break;
    case 51: getDocumentElement('.audiogame__translate_item')[2].click(); break;
    case 52: getDocumentElement('.audiogame__translate_item')[3].click(); break;
    case 53: getDocumentElement('.audiogame__translate_item')[4].click(); break;
    default: event.stopPropagation();
  }
}

export default chooseKeyDown;
