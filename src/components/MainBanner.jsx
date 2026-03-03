import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './css/MainBanner.module.css';

import { Autoplay, Pagination, Navigation } from 'swiper';
import { optimizeCloudinaryUrl } from './js/util';

const slides = [
  {
    desktop: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705893944/wmzeuycnkxyldfnqllyz.webp',
    mobile: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894339/s3apdxiz3mrpz10rnagw.webp',
  },
  {
    desktop: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894160/pctlvk82ff1jglnxbr8u.webp',
    mobile: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894383/hmawll6d2csndmpwcapj.webp',
  },
  {
    desktop: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894235/hjuxcgvbiummki1uufp5.webp',
    mobile: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894418/fkfz6kwisiv2lcvzajgf.webp',
  },
];

export default function MainBanner() {
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
        {slides.map((slide, idx) => {
          return (
            <SwiperSlide key={idx} className={styles.slideWrapBox}>
              <div className={styles.slideInner}>
                <picture className={styles.slidePicture}>
                  {/* 화면 너비가 1200px 이하일 때 모바일 이미지를 사용 (기존 JS 로직 대체) */}
                  <source media="(max-width: 1200px)" srcSet={optimizeCloudinaryUrl(slide.mobile, 800)} />
                  <img
                    className={styles.bannerImg}
                    src={optimizeCloudinaryUrl(slide.desktop, 1920)}
                    alt={`Main Banner ${idx + 1}`}
                    width={1920}
                    height={600}
                    fetchpriority={idx === 0 ? 'high' : 'auto'}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="sync"
                  />
                </picture>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
