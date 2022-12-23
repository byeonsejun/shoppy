import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { useLocation } from "react-router-dom";
import PageNav from "./ui/PageNav";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [nowProducts, setNowProducts] = useState(null);
  const [sortSelect] = useState(["Select", "Low Price", "High Price"]);
  const [selected, setSelected] = useState("");

  const location = useLocation();
  let sliceUrl = location.pathname.split("/")[2];
  let tabUrl = location.pathname.split("/")[1];
  let productType;

  function productTypeFn(sliceUrl) {
    switch (sliceUrl) {
      case "accessories":
        productType = 0;
        break;
      case "men":
        productType = 1;
        break;
      case "women":
        productType = 2;
        break;
      default:
        productType = 10;
    }
    console.log(productType);
    if ((tabUrl = "shop" && 10 > productType)) {
      console.log("상품 구체 페이지");
      products && setNowProducts([...products[productType]]);
    } else if ((tabUrl = "shop" && productType === 10)) {
      console.log("상품 전체 페이지");
      let allArr = [];
      products &&
        products.map((product) => 
        product.map((item) => allArr.push(item) ) );
      allArr.reverse();
      products && setNowProducts(allArr);
    }
  }

  let [wishFlag, setWishFlag] = useState(
    JSON.parse(localStorage.getItem("wishItem"))
  );

  let myWish = JSON.parse(localStorage.getItem("wishItem"));
  myWish === null && localStorage.setItem("wishItem", JSON.stringify([]));

  function getWishItem(product) {
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
    setWishFlag(myWish);
  }

  const sample2 = (e) => {
    switch (e.target.value) {
      case "Low Price":
        console.log("Low Price!!!");
        const row = nowProducts.sort(function (a, b) {
          return a.price - b.price;
        });
        setNowProducts(row);
        break;
      case "High Price":
        console.log("High Price!!!");
        const high = nowProducts.sort(function (a, b) {
          return b.price - a.price;
        });
        setNowProducts(high);
        break;
      default:
        console.log("Select!!!");
    }
    setSelected(e.target.value);
  };

  useEffect(() => {
    setSelected("Select");
    productTypeFn(sliceUrl);
  }, [products, sliceUrl]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PageNav sliceUrl={sliceUrl} />
      <div className="text-right">
        <label className="text-brand font-bold" htmlFor="select">
          정렬:
        </label>
        <select
          id="select"
          className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
          onChange={sample2}
          value={selected}
        >
          {sortSelect &&
            sortSelect.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {nowProducts &&
          nowProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                getWishItem={getWishItem}
                wishFlag={wishFlag}
              />
            );
          })}
      </ul>
    </>
  );
}
