export const returnLocalStorageValue = (text) => {
  let target = JSON.parse(localStorage.getItem(text));

  if (target === null) {
    target = setLocalStorage(text, []);
  }

  return target;
};

export const someLocalstorage = (array, id) => {
  return array.some((item) => item.id === id);
};

export const findLocalstorage = (array, id) => {
  return array.find((item) => String(item.id) === id);
};

export const filteredLocalstorage = (array, id) => {
  return array.filter((item) => item.id !== id);
};

export const setLocalStorage = (text, array) => {
  localStorage.setItem(text, JSON.stringify(array));
};
