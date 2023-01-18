export function getWishItem(product) {
  // localStorage.setItem("wishItem", JSON.stringify([product]));
  let myWish = JSON.parse(localStorage.getItem("wishItem"));
  // console.log(product) // 전달받은 정보
  // console.log(myWish) // 로컬스토리지 정보

  const wishResult = myWish.find((item) => String(item.id) === product.id);
  // console.log(wishResult)
  if (wishResult === undefined) {
    // 체크되지 않은 위시 클릭시
    myWish.push(product);
    localStorage.setItem("wishItem", JSON.stringify(myWish));
  } else {
    // 이미 체크된 위시 클릭시
    myWish = myWish.filter((item) => item.id !== product.id);
    localStorage.setItem("wishItem", JSON.stringify(myWish));
  }
  return myWish;
}

export function sortSelectFn(e, nowProducts) {
  let result1 = "";
  let result2 = e.target.value;
  switch (e.target.value) {
    case "낮은가격":
      // console.log("낮은가격222!!!");
      const row = nowProducts.sort(function (a, b) {
        return a.price - b.price;
      });
      result1 = row;
      break;
    case "높은가격":
      // console.log("높은가격222!!!");
      const high = nowProducts.sort(function (a, b) {
        return b.price - a.price;
      });
      result1 = high;
      break;
    default:
      // console.log("Select!!!");
      break;
  }
  const finish = [result1, result2];
  return finish;
}

export function productSlideResult(info, products) {
  const sortProductsArr = products &&
    products.filter((item) => {
      return item.description === info;
    })
    sortProductsArr.sort(() => Math.random() - 0.5);
  return sortProductsArr
}

// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }