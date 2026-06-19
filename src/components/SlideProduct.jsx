import React, { useEffect, useState } from 'react';
import useProducts from '../hooks/useProducts';
import { productSlideResult } from './js/product';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import ProductCard from './ProductCard';

const SECTION_META = {
  NEW: { eyebrow: 'NEW ARRIVALS', title: '이번 주 신상' },
  HOT: { eyebrow: 'HOT NOW', title: '지금 인기있는' },
  BEST: { eyebrow: 'BEST SELLERS', title: '가장 사랑받는' },
};

export default function SlideProduct({ info }) {
  const {
    productsQuery: { data: products },
  } = useProducts();

  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(productSlideResult(info, products));
  }, [info, products]);

  const meta = SECTION_META[info] || { eyebrow: `${info} LIST`, title: info };

  return (
    <section className={`product_slide_wrap ${info}`} aria-label={`${info} 상품 목록`}>
      <div className="slideHead">
        <p className="eyebrow">{meta.eyebrow}</p>
        <h2 className="slideTitle">{meta.title}</h2>
      </div>
      <Swiper
        role="list"
        aria-label={`${info} 상품 슬라이드`}
        grabCursor={true}
        slidesPerView={1.2}
        spaceBetween={20}
        navigation={true}
        speed={1000}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 4.3,
          },
        }}
        modules={[Navigation]}
        className={`mySwiper ${info}_swiper`}
      >
        {items &&
          items.map((item) => {
            return (
              <SwiperSlide key={item.id} role="listitem">
                <ProductCard product={item} asListItem={false} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}
