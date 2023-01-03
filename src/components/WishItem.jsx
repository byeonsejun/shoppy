import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./css/WishItem.module.css";

export default function WishItem({
  product,
  product: { id, image, title, price, category },
  deleteWish,
}) {
  const navigate = useNavigate();
  function goToDetail(link1, link2) {
    navigate(`/shop/${link1}/${link2}`, { state: { product } });
  }

  return (
    <li className={styles.item}>
      <img
        src={image}
        alt={title}
        className={styles.wishImg}
        onClick={() => goToDetail(category, id)}
      />
      <div className={styles.wishInfoBox}>
        <div className={styles.wishInfoBoxInner}>
          <p className={styles.category}>{category}</p>
          <p className={styles.title}>{title}</p>
          <p>{price}원</p>
        </div>
      </div>
      <span className={styles.cancel} onClick={() => deleteWish(id)}>
        X
      </span>
    </li>
  );
}
