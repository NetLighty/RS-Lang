export const deleteClass = (className:string):void => {
  document.querySelectorAll(`.${className}`).forEach(
    (item) => item.classList.remove(className),
  );
};

export const addClass = (className:string):void => {
  document.querySelectorAll(`.${className}`).forEach(
    (item) => item.classList.add(className),
  );
};
