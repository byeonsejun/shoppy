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

export const optimizeCloudinaryUrl = (url, width) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  const parts = url.split('/upload/');
  if (parts.length < 2) return url;
  return `${parts[0]}/upload/w_${width},f_auto,q_auto/${parts[1]}`;
};
