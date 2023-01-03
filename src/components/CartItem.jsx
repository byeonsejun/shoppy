import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useCart from '../hooks/useCart';

import styles from './css/CartItem.module.css';

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
  addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(id);
  return (
    <li className={styles.item}>
      <img src={image} alt={title} className={styles.img}/>
      <div className={styles.innerBox}>
        <div className={styles.productInfo}>
          <p className={styles.title}>{title}</p>
          <p className={styles.option}>[옵션: {option}]</p>
          <p className={styles.price}>{price}원</p>
        </div>
        <div className={styles.iconBox}>
          <AiOutlineMinusSquare className={styles.icon} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={styles.icon} onClick={handlePlus} />
          <RiDeleteBin5Fill className={styles.icon} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
