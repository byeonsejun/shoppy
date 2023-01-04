import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

import styles from "./css/RollingCategory.module.css";

export default function RollingCategory() {
  const navigate = useNavigate();
  const [bgUrl] = useState([
    {
      url: "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672364851/main_outer_vbhrjf.jpg",
      link: "OUTER",
    },
    {
      url: "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672364859/main_denim_tff6vz.jpg",
      link: "DENIM",
    },
    {
      url: "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672364868/main_shoes_wpd2gj.jpg",
      link: "SHOES",
    },
  ]);

  return (
    <section className="category_slide">
      <div className="category_swiper_inner">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          speed={1000}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 1.3,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper categorySwiper"
        >
          {bgUrl.map((slide) => {
            return (
              <SwiperSlide key={slide.link}>
                <div
                  className={styles.categorySlide}
                  onClick={() => navigate(`/shop/${slide.link}`)}
                  style={{
                    backgroundImage: `url(${slide.url})`,
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
