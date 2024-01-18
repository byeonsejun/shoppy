import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ProductCard.module.css';
import { hanldeWish } from './js/product';
import { someLocalstorage, returnLocalStorageValue } from './js/util';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [currentWish, setCurrentWish] = useState(false);
  const [wishFlag, setWishFlag] = useState(returnLocalStorageValue('wishItem'));

  const machStorageItem = () => {
    let myWishs = returnLocalStorageValue('wishItem');
    const itemResult = someLocalstorage(myWishs, product.id);
    setCurrentWish(itemResult);
  };

  useEffect(() => {
    machStorageItem();
    // eslint-disable-next-line
  }, [wishFlag]);

  return (
    <div className={styles.cardBox}>
      <li className={styles.li}>
        <img
          className={styles.productImg}
          src={product.image}
          alt={product.title}
          onClick={() => {
            navigate(`/shop/${product.category}/${product.id}`, {
              state: { product },
            });
          }}
        />
        <div className={styles.textBox}>
          <h3 className={styles.h3}>{product.title}</h3>
          <p>{`${product.price.toLocaleString()}원`}</p>
          <span>{product.description}</span>
        </div>
      </li>
      <span className={styles.cardWishBtt} onClick={() => setWishFlag(hanldeWish(product))}>
        {currentWish ? (
          <img
            src="https://res.cloudinary.com/daqjqq0hy/image/upload/v1674042393/before_wish_icon_cvubwo.png"
            alt="wish_after"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/daqjqq0hy/image/upload/v1674042389/after_wish_icon_rxs6nh.png"
            alt="wish_before"
          />
        )}
      </span>
    </div>
  );
}
