import React from 'react';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

import FadeLoader from 'react-spinners/FadeLoader';

import styles from './css/MyCart.module.css';

const SHIPPING = 3000;
export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

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
    <section className={styles.section}>
      <h2 className={styles.h2}>My Cart</h2>
      {!hasProducts && <p className={styles.notProduct}>My Cart에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className={styles.ul}>
            {products &&
              products.map((product) => {
                return <CartItem key={product.id} product={product} />;
              })}
          </ul>
          <div className={styles.bottomBox}>
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className={styles.shrink} />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals className={styles.shrink} />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
