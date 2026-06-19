import React from 'react';
import styles from './css/PriceCard.module.css';

export default function PriceCard({ text, price, highlight = false }) {
  return (
    <div className={`${styles.priceCardWrap} ${highlight ? styles.highlight : ''}`}>
      <p className={styles.label}>{text}</p>
      <p className={styles.price}>{price.toLocaleString()}원</p>
    </div>
  );
}
