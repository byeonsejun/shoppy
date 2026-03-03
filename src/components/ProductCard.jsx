import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ProductCard.module.css';
import { hanldeWish } from './js/product';
import { someLocalstorage, returnLocalStorageValue, optimizeCloudinaryUrl } from './js/util';

export default function ProductCard({ product, asListItem = true }) {
  const navigate = useNavigate();
  const [currentWish, setCurrentWish] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const [wishFlag, setWishFlag] = useState(returnLocalStorageValue('wishItem'));

  const machStorageItem = () => {
    let myWishs = returnLocalStorageValue('wishItem');
    const itemResult = someLocalstorage(myWishs, product.id);
    setCurrentWish(itemResult);
  };

  const addEffectImg = () => {
    if (!currentWish) {
      setShowEffect(true);
      setTimeout(() => setShowEffect(false), 3000);
    }
  };

  useEffect(() => {
    machStorageItem();
    // eslint-disable-next-line
  }, [wishFlag]);

  const cardContent = (
    <div className={styles.cardBox}>
      <div className={styles.productImgBox} id={showEffect ? 'show_img_effct' : ''}>
        <img
          className={styles.productImg}
          src={optimizeCloudinaryUrl(product.image, 320)}
          alt={product.title}
          width="283"
          height="364"
          loading="lazy"
          onClick={() => {
            // 이미지 클릭 시 상품 상세 페이지로 이동
            navigate(`/shop/${product.category}/${product.id}`, {
              state: { product },
            });
          }}
        />
      </div>
      <div className={styles.textBox}>
        <h3 className={styles.h3}>{product.title}</h3>
        <h3 className={styles.h3}>{product.title}</h3> {/* 상품 제목 */}
        <p>{`${product.price.toLocaleString()}원`}</p>
        <span>{product.description}</span>
      </div>
      <span
        className={styles.cardWishBtt}
        onClick={() => {
          addEffectImg();
          setWishFlag(hanldeWish(product));
        }}
      >
        {currentWish ? (
          <img
            src="http://res.cloudinary.com/daqjqq0hy/image/upload/v1705895168/bjjmssfonw18y63uqfcq.webp"
            alt="wish_after"
            width="15"
            height="15"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/daqjqq0hy/image/upload/v1705895072/phcpiyxmzqp9o1up6u1l.webp"
            alt="wish_before"
            width="15"
            height="15"
          />
        )}
      </span>
    </div>
  );

  if (asListItem) {
    return <li className={styles.li}>{cardContent}</li>;
  }
  /* SlideProduct 내부: ul > li(SwiperSlide) 안에 들어가므로 li 대신 같은 크기 래퍼(styles.li)로 감싸서 카드 크기 통일 */
  return <div className={styles.li}>{cardContent}</div>;
}
