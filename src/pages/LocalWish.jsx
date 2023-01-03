import React, { useState } from "react";
import WishItem from "../components/WishItem";

import styles from "./css/LocalWish.module.css";

export default function LocalWish() {
  const [myWishItem, setMyWishItem] = useState(
    JSON.parse(localStorage.getItem("wishItem"))
  );
  const hasWishs = myWishItem && myWishItem.length > 0;

  function deleteWish(itemId) {
    const myWishs = myWishItem.filter((item) => item.id !== itemId);
    localStorage.setItem("wishItem", JSON.stringify(myWishs));
    setMyWishItem(myWishs);
  }

  return (
    <section className={styles.wishSection}>
      <h2 className={styles.wishSectionTitle}>
        My Wish List
      </h2>
      {!hasWishs && <p>Wish List에 상품이 없습니다.</p>}
      {hasWishs && (
        <ul className={styles.wishSectionUl}>
          {myWishItem &&
            myWishItem.map((product) => {
              return (
                <WishItem
                  key={product.id}
                  product={product}
                  deleteWish={deleteWish}
                />
              );
            })}
        </ul>
      )}
    </section>
  );
}
