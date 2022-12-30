import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

export default function RollingBanner() {
  const [bgUrl] = useState([
    "https://res.cloudinary.com/daqjqq0hy/image/upload/v1672197554/mdsection1_l1gn4i.jpg",
  ]);

  return (
    <section style={{ marginBottom: "320px" }}>
      <Swiper
        slidesPerView={1}
        // grabCursor={true}
        // navigation={true}
        modules={[Navigation]}
        className="mySwiper seccondSlider"
      >
        {bgUrl.map((slide, idx) => {
          return (
            <div key={slide}>
              <SwiperSlide>
                <div
                  style={{
                    backgroundImage: `url(${slide})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover",
                    height: "60vh",
                    maxWidth: "626px",
                    maxHeight: "781px",
                    margin: "0 auto",
                  }}
                ></div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </section>
  );
}
