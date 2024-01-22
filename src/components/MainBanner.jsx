import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styels from './css/MainBanner.module.css';

import { Autoplay, Pagination, Navigation } from 'swiper';

export default function MainBanner() {
  const [bgUrl, setBgUrl] = useState([
    'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705893944/wmzeuycnkxyldfnqllyz.webp',
    'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894160/pctlvk82ff1jglnxbr8u.webp',
    'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894235/hjuxcgvbiummki1uufp5.webp',
  ]);

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setBgUrl([
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705893944/wmzeuycnkxyldfnqllyz.webp',
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894160/pctlvk82ff1jglnxbr8u.webp',
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894235/hjuxcgvbiummki1uufp5.webp',
      ]);
    } else {
      setBgUrl([
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894339/s3apdxiz3mrpz10rnagw.webp',
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894383/hmawll6d2csndmpwcapj.webp',
        'http://res.cloudinary.com/daqjqq0hy/image/upload/v1705894418/fkfz6kwisiv2lcvzajgf.webp',
      ]);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
          type: 'fraction',
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
