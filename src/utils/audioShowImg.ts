import getDocumentElement from './getDocumentElement';

function showImage() {
  getDocumentElement('.audiogame__header_img')[0].classList.add('show-img');
}

export default showImage;
