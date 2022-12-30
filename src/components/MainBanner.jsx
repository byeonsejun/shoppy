import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainBanner() {

  const [bgUrl] = useState([
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672132323/mainbg1_jt8lff.jpg",
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672132332/mainbg2_gbieys.jpg",
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672132339/mainbg3_lfkzxz.jpg",
  ])
  
  return (
    <section 
      className='mainBanner'
      style={{
        marginBottom: "320px",
      }}
    >
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
        modules={[ Autoplay, Pagination, Navigation, ]}
        className="mySwiper mainSlider"
      >
        {
          bgUrl.map((slide,idx) => {
            return (
              <SwiperSlide key={idx}>
                <div
                  style={{
                    backgroundImage:`url(${slide})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover",
                    height: "80vh",
                    maxHeight: "828.75px",
                  }}
                >
                </div>
              </SwiperSlide>
            )    
          })
        }
      </Swiper>
    </section>
  );
}

