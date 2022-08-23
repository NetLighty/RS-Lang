function getDocumentElement(name: string) {
  return [...document.querySelectorAll(name)] as HTMLElement[];
}

export default getDocumentElement;
