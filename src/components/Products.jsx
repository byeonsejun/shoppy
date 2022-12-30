import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { useLocation } from "react-router-dom";
import PageNav from "./ui/PageNav";

import styles from "./css/Products.module.css";
import { sortSelectFn } from './js/product';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [nowProducts, setNowProducts] = useState(null);
  const [sortSelect] = useState(["진열방식", "낮은가격", "높은가격"]);
  const [selected, setSelected] = useState("");

  const location = useLocation();
  let tabUrl = location.pathname.split("/")[1];
  let sliceUrl = location.pathname.split("/")[2];
  let productType;
  
  function productTypeFn(sliceUrl) {
    if(tabUrl === "shop"){
      switch (sliceUrl) {
        case "OUTER":
          productType = 1;
          break;
        case "DENIM":
          productType = 0;
          break;
        case "SHOES":
          productType = 2;
          break;
        default:
          productType = 10; // 전체 상품 보여주기 /shop
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
        // allArr.reverse();
        products && setNowProducts(allArr);
        console.log(allArr)
      }
    } else { // shop/ 이 아닐경우 Ex) 메인 페이지
      console.log("메인 홈 페이지");
    }
  }

  // localStorage 셋팅
  let myWish = JSON.parse(localStorage.getItem("wishItem"));
  myWish === null && localStorage.setItem("wishItem", JSON.stringify([]));

  useEffect(() => {
    setSelected("진열방식");
    productTypeFn(sliceUrl);
    // console.log(nowProducts);
  }, [products, sliceUrl]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PageNav sliceUrl={sliceUrl} />
      <div className={styles.sortBox}>
        <label className={styles.label} htmlFor="select"></label>
        <select
          id="select"
          className={styles.select}
          onChange={(e) => {
            const selectResult = sortSelectFn(e,nowProducts)
            console.log(selectResult)
            selectResult[0] && setNowProducts(selectResult[0]);
            selectResult[0] && setSelected(selectResult[1]);
          }}
          value={selected}
        >
          {sortSelect &&
            sortSelect.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
      </div>
      <ul className={styles.ul}>
        {nowProducts &&
          nowProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            );
          })}
      </ul>
    </>
  );
}
