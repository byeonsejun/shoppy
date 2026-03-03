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
                  {/* 첫 슬라이드(LCP): 단일 URL로 즉시 요청 시작. 나머지는 srcset 허용 */}
                  <source
                    media="(max-width: 1200px)"
                    srcSet={
                      idx === 0
                        ? optimizeCloudinaryUrl(slide.mobile, 480)
                        : `${optimizeCloudinaryUrl(slide.mobile, 480)} 480w, ${optimizeCloudinaryUrl(slide.mobile, 800)} 800w`
                    }
                    sizes={idx === 0 ? undefined : '(max-width: 768px) 100vw, 800px'}
                  />
                  <img
                    className={styles.bannerImg}
                    src={optimizeCloudinaryUrl(slide.desktop, 1920)}
                    alt={`Main Banner ${idx + 1}`}
                    width={1920}
                    height={600}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding={idx === 0 ? 'sync' : 'async'}
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
