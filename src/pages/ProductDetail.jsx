import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';

import { BsFillCartCheckFill } from "react-icons/bs";

import styles from "./css/ProductDetail.module.css";


export default function ProductDetail() {
  const { user, popUp, setPopUp } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 여기에서 장바구니에 추가하면 됨!
    if(user === null) {
      console.log("return");
      setPopUp(true);
      return 
    }
    const product = { id, image, title, price, option: selected, quantity: 1};
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가 되었습니다.');
        setTimeout(()=> setSuccess(null), 3000);
      }
    });
  };

  return (
    <>
      <h2 className={styles.h2}>{category}</h2>
      <section className={styles.section}>
        <div className={styles.imgBox}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.selectBox}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.price}>
            {price.toLocaleString()}원
          </p>
          <p className={styles.description}>{description}</p>
          <div className={styles.option}>
            <label className={styles.label} htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              className={styles.select}
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          { success && <p className={styles.check}><BsFillCartCheckFill /> {success}</p>}
          <Button text='장바구니에 추가' onClick={handleClick} />
          { popUp && <PopUp /> }
        </div>
      </section>
    </>
  );
}
