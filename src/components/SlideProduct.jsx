import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { productSlideResult } from "./js/product";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ProductCard from "./ProductCard";

export default function SlideProduct({ info }) {
  const {
    productsQuery: { data: products },
  } = useProducts();

  // console.log(products);

  const [items, setItems] = useState(null);
  // console.log(products);

  useEffect(() => {
    setItems(productSlideResult(info, products));
  }, [info, products]);

  return (
    <section className={`product_slide_wrap ${info}`}>
      <h3>{info} LIST</h3>
      <Swiper
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
              <SwiperSlide key={item.id}>
                <ProductCard product={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}
