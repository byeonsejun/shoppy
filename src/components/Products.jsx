import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { useLocation, useSearchParams } from "react-router-dom";
import PageNav from "./ui/PageNav";

import styles from "./css/Products.module.css";
import { sortSelectFn } from "./js/product";

import FadeLoader from "react-spinners/FadeLoader";

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [nowProducts, setNowProducts] = useState(null);
  const [sortSelect] = useState(["진열방식", "낮은가격", "높은가격"]);
  const [selected, setSelected] = useState("");

  const location = useLocation();
  let [query] = useSearchParams();
  let searchQuery = query.get("s");

  // let tabUrl = location.pathname.split("/")[1];
  let sliceUrl = location.pathname.split("/")[2];

  function productTypeFn() {
    // console.log(tabUrl);
    // console.log(sliceUrl);
    if (sliceUrl === undefined) {
      // 상품 전체 페이지
      products && setNowProducts(products);
    } else {
      // 상품 검색일시
      if (searchQuery) {
        const searchItem =
          products &&
          products.filter((item) => item.title.includes(searchQuery));
        setNowProducts(searchItem);
        return;
      }
      // 상품 카테고리 페이지
      const sortProductsArr =
        products &&
        products.filter((item) => {
          return item.category === sliceUrl;
        });
      setNowProducts(sortProductsArr);
    }
  }

  // localStorage 셋팅
  let myWish = JSON.parse(localStorage.getItem("wishItem"));
  myWish === null && localStorage.setItem("wishItem", JSON.stringify([]));
  
  useEffect(() => {
    setSelected("진열방식");
    productTypeFn(sliceUrl);
    // eslint-disable-next-line
  }, [products, sliceUrl, searchQuery]);

  if (isLoading) {
    return (
      <FadeLoader
        color="gray"
        loading={isLoading}
        size={25}
        cssOverride={{ position: "fixed", left: "50%", top: "50%" }}
      />
    );
  }

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
            const selectResult = sortSelectFn(e, nowProducts);
            // console.log(selectResult)
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
            return <ProductCard key={product.id} product={product} />;
          })}
          {nowProducts && nowProducts.length === 0 && <span>찾으시는 상품이 없습니다</span>}
      </ul>
    </>
  );
}
