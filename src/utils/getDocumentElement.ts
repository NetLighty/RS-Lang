function getDocumentElement(name: string) {
  return [...document.querySelectorAll(name)];
}

export default getDocumentElement;
