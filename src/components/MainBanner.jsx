import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styels from "./css/MainBanner.module.css";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainBanner() {
  const [bgUrl, setBgUrl] = useState();

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      // console.log("1200 이상");
      setBgUrl([
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732119/mainbg1_zjgfqv.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732139/mainbg2_a7yfpf.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732149/mainbg3_g2kxaj.jpg",
      ]);
    } else {
      // console.log("1200 이하");
      setBgUrl([
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732235/mbmainbg1_necwoz.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732239/mbmainbg2_zitspg.jpg",
        "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672732244/mbmainbg3_zhno5p.jpg",
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
