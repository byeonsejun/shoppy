import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
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

  const goToDetail = () => {
    navigate(`/shop/${product.category}/${product.id}`, {
      state: { product },
    });
  };

  // product.description 에 'NEW' / 'HOT' / 'BEST' 가 들어있어 뱃지로 사용
  const badge = product.description;

  const cardContent = (
    <div className={styles.cardBox}>
      <div className={styles.productImgBox} id={showEffect ? 'show_img_effct' : ''} onClick={goToDetail}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <img
          className={styles.productImg}
          src={optimizeCloudinaryUrl(product.image, 320)}
          alt={product.title}
          width="283"
          height="364"
          loading="lazy"
        />
        <button
          type="button"
          className={styles.cardWishBtt}
          aria-label={currentWish ? '위시리스트에서 제거' : '위시리스트에 추가'}
          onClick={(e) => {
            e.stopPropagation();
            addEffectImg();
            setWishFlag(hanldeWish(product));
          }}
        >
          {currentWish ? <BsHeartFill className={styles.heartOn} /> : <BsHeart />}
        </button>
      </div>
      <div className={styles.textBox} onClick={goToDetail}>
        <h3 className={styles.h3}>{product.title}</h3>
        <p className={styles.price}>{`${product.price.toLocaleString()}원`}</p>
      </div>
    </div>
  );

  if (asListItem) {
    return <li className={styles.li}>{cardContent}</li>;
  }
  /* SlideProduct 내부: div(role=list) > .swiper-slide(role=listitem) 안에 들어가므로 같은 크기 래퍼(styles.li)로 감싸서 카드 크기 통일 */
  return <div className={styles.li}>{cardContent}</div>;
}
