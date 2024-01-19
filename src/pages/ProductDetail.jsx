import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';

import { BsFillCartCheckFill } from 'react-icons/bs';
import FadeLoader from 'react-spinners/FadeLoader';

import styles from './css/ProductDetail.module.css';

export default function ProductDetail() {
  const { user, popUp, setPopUp } = useAuthContext();
  const {
    cartQuery: { data: inCartProducts },
    addOrUpdateItem,
  } = useCart();
  const {
    productsQuery: { isLoading },
  } = useProducts();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = () => {
    if (user === null) {
      setPopUp(true);
      return;
    }

    const product = { id, image, title, price, option: selected, quantity: 1 };

    const hasSameOptionItem = inCartProducts.some((item) => item.id === id && item.option === selected);
    const hasSameIdItem = inCartProducts.some((item) => item.id === id);

    if (hasSameOptionItem) {
      timeOutTextFn('이미 장바구니에 추가된 상품입니다.', 3000);
      return;
    }

    if (hasSameIdItem) {
      timeOutTextFn('이미 추가한 상품은 다른옵션을 선택할수 없습니다.', 3000);
      return;
    }

    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        timeOutTextFn('장바구니에 추가 되었습니다.', 3000);
      },
    });
  };

  const timeOutTextFn = (text, time) => {
    setSuccess(`${text}`);
    setTimeout(() => setSuccess(null), time);
  };

  if (isLoading)
    return (
      <FadeLoader
        color="gray"
        loading={isLoading}
        size={25}
        cssOverride={{ position: 'fixed', left: '50%', top: '50%' }}
      />
    );

  return (
    <>
      <h2 className={styles.h2}>{category}</h2>
      <section className={styles.section}>
        <div className={styles.imgBox}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.selectBox}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>{price.toLocaleString()}원</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.option}>
            <label className={styles.label} htmlFor="select">
              옵션:
            </label>
            <select id="select" className={styles.select} onChange={handleSelect} value={selected}>
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          {success && (
            <p className={styles.check}>
              <BsFillCartCheckFill /> {success}
            </p>
          )}
          <Button text="장바구니에 추가" onClick={handleClick} />
          {popUp && <PopUp />}
        </div>
      </section>
    </>
  );
}
