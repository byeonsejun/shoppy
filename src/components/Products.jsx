import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import { useLocation, useSearchParams } from 'react-router-dom';
import PageNav from './ui/PageNav';

import styles from './css/Products.module.css';
import { sortSelectFn } from './js/product';

import FadeLoader from 'react-spinners/FadeLoader';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [nowProducts, setNowProducts] = useState(null);
  const [sortSelect] = useState(['상품등록순', '낮은가격순', '높은가격순']);
  const [selected, setSelected] = useState('');

  const location = useLocation();
  let [query] = useSearchParams();
  let searchQuery = query.get('s');

  let sliceUrl = location.pathname.split('/')[2];

  // url 경로 이용하여 현재 보여줄 아이템 필터링
  const productTypeFn = () => {
    if (sliceUrl === undefined) {
      // 상품 전체 페이지
      products && setNowProducts(products);
    } else {
      if (searchQuery) {
        // 상품 검색일시
        const searchItem = products && products.filter((item) => item.title.includes(searchQuery));
        setNowProducts(searchItem);
        return;
      }
      // 상품 카테고리 페이지
      const sortProductsArr =
        products &&
        products.filter((item) => {
          return item.category === sliceUrl;
        });
      setNowProducts(sortProductsArr);
    }
  };

  // 상품셀렉트필터 핸들함수
  const handleSelectFilter = (e) => {
    const selectResult = sortSelectFn(e, nowProducts);
    if (selectResult[1] === '상품등록순') {
      productTypeFn();
      setSelected(selectResult[1]);
      return;
    }
    setNowProducts(selectResult[0]);
    setSelected(selectResult[1]);
  };

  useEffect(() => {
    setSelected('상품등록순');
    productTypeFn();
    // eslint-disable-next-line
  }, [products, sliceUrl, searchQuery]);

  if (isLoading) {
    return (
      <FadeLoader
        color="gray"
        loading={isLoading}
        size={25}
        cssOverride={{ position: 'fixed', left: '50%', top: '50%' }}
      />
    );
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PageNav sliceUrl={sliceUrl} />
      <div className={styles.sortBox}>
        <label className={styles.label} htmlFor="select"></label>
        <select id="select" className={styles.select} onChange={handleSelectFilter} value={selected}>
          {sortSelect && sortSelect.map((option, index) => <option key={index}>{option}</option>)}
        </select>
      </div>
      <ul className={styles.ul}>
        {nowProducts &&
          nowProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        {nowProducts && nowProducts.length === 0 && <span>찾으시는 상품이 없습니다</span>}
      </ul>
    </>
  );
}
