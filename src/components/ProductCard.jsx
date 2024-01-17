import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ProductCard.module.css';
import { getWishItem } from './js/product';

export default function ProductCard({ product }) {
  // console.log(product)
  const navigate = useNavigate();
  const [nowResult, setNowResult] = useState(null);

  const findWish = () => {
    let myWishs = JSON.parse(localStorage.getItem('wishItem'));
    myWishs === null && localStorage.setItem('wishItem', JSON.stringify([]));
    const itemResult = myWishs && myWishs.some((myWish) => myWish.id === product.id);
    // console.log(product.id); //현재의 id
    // console.log(itemResult); // 현재의 리설트값
    // console.log(myWishs)
    // 로컬스토리지에 있으면 true 없으면 false
    setNowResult(itemResult);
  };

  let [wishFlag, setWishFlag] = useState(JSON.parse(localStorage.getItem('wishItem')));

  useEffect(() => {
    findWish();
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
      <span className={styles.cardWishBtt} onClick={() => setWishFlag(getWishItem(product))}>
        {nowResult ? (
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
