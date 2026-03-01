import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './css/WishItem.module.css';

export default function WishItem({ product, product: { id, image, title, price, category }, deleteWish }) {
  const navigate = useNavigate();

  const goToDetail = (category, id) => {
    navigate(`/shop/${category}/${id}`, { state: { product } });
  };

  return (
    <li className={styles.item}>
      <img
        src={image}
        alt={title}
        className={styles.wishImg}
        onClick={() => goToDetail(category, id)}
        loading="lazy"
        width="192"
        height="246"
      />
      <div className={styles.wishInfoBox}>
        <div className={styles.wishInfoBoxInner}>
          <p className={styles.category}>{category}</p>
          <p className={styles.title}>{title}</p>
          <p>{price.toLocaleString()}원</p>
        </div>
      </div>
      <span className={styles.cancel} onClick={() => deleteWish(id)}>
        X
      </span>
    </li>
  );
}
