import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { productSlideResult } from "./js/product";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import ProductCard from './ProductCard';

export default function SlideProduct({ info }) {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [items, setItems] = useState(null);
  // console.log(products);

  useEffect(() => {
    setItems(productSlideResult(info, products));
  }, [products]);

  

  return (
    <section className={`product_slide_wrap ${info}`}>
      <h3>{info} LIST</h3>
      <Swiper
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        // loop={true}
        grabCursor={true}
        slidesPerView={4.3}
        spaceBetween={20}
        navigation={true}
        speed={1000}
        modules={[Autoplay, Navigation]}
        className={`mySwiper ${info}_swiper`}
      >
        {items && items.map((item) => {
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
