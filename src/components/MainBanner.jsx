import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styels from "./css/MainBanner.module.css";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainBanner() {
  const [bgUrl, setBgUrl] = useState([
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041510/mainbg1_q9gki5.jpg",
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041519/mainbg2_iespuf.jpg",
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041525/mainbg3_a67rfe.jpg",
  ]);

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      // console.log("1200 이상");
      setBgUrl([
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041510/mainbg1_q9gki5.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041519/mainbg2_iespuf.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041525/mainbg3_a67rfe.jpg",
      ]);
    } else {
      // console.log("1200 이하");
      setBgUrl([
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041693/mbmainbg1_vojf5v.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041700/mbmainbg2_h1j4qh.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1674041705/mbmainbg3_cv4bcl.jpg",
      ]);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="mainBanner">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        navigation={true}
        speed={1000}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mainSlider"
      >
        {bgUrl &&
          bgUrl.map((slide, idx) => {
            return (
              <SwiperSlide key={idx} className={styels.slideWrapBox}>
                <div
                  className={styels.slideInner}
                  style={{
                    backgroundImage: `url(${slide})`,
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}
