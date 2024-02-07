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

export const handleClickReset = () => {
  const root = document.getElementById('root');
  const searchDiv = document.getElementById('search_div');
  const searchStyle = window.getComputedStyle(searchDiv);
  root.addEventListener('click', (e) => {
    const searchDisplay = searchStyle.display;
    if (e.target.id === 'search_button') {
      searchDisplay === 'none' ? (searchDiv.style.display = 'flex') : (searchDiv.style.display = 'none');
    } else {
      if (e.target.id !== 'search_input') searchDiv.style.display = 'none';
    }
  });
};
