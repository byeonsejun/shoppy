import { filteredLocalstorage, findLocalstorage, returnLocalStorageValue, setLocalStorage } from './util';

export function hanldeWish(product) {
  let myWish = returnLocalStorageValue('wishItem');

  const currentWish = findLocalstorage(myWish, product.id);
  if (currentWish === undefined) {
    myWish.push(product);
    setLocalStorage('wishItem', myWish);
  } else {
    myWish = filteredLocalstorage(myWish, product.id);
    setLocalStorage('wishItem', myWish);
  }
  return myWish;
}

export function sortSelectFn(e, nowProducts) {
  let itemlist = [];
  const type = e.target.value;
  switch (type) {
    case '낮은가격순':
      itemlist = nowProducts.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case '높은가격순':
      itemlist = nowProducts.sort(function (a, b) {
        return b.price - a.price;
      });
      break;
    default:
      break;
  }
  return [itemlist, type];
}

export function productSlideResult(info, products) {
  const sortProductsArr =
    products &&
    products.filter((item) => {
      return item.description === info;
    });
  sortProductsArr.sort(() => Math.random() - 0.5);
  return sortProductsArr;
}

// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }
