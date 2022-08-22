import getDocumentElement from './getDocumentElement';

function hideImage() {
  getDocumentElement('.audiogame__header_img')[0].classList.remove('show-img');
}

export default hideImage;
