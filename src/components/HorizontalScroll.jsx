import React, { useEffect, useRef, useState } from 'react';
import styles from './css/HorizontalScroll.module.css';
import { optimizeCloudinaryUrl } from './js/util';

const IMAGES = [
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/3_glv2c6.jpg',
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/1_zq7rhs.jpg',
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/4_ozzp6z.jpg',
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/2_lnhzxv.jpg',
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/5_ouufia.jpg',
  'https://res.cloudinary.com/daqjqq0hy/image/upload/v1781846659/6_itabjl.jpg',
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function HorizontalScroll() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [height, setHeight] = useState(0);

  // 트랙 가로 길이만큼 세로 스크롤 구간을 확보 (가로 이동 거리 ≈ 세로 스크롤 거리)
  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      if (window.innerWidth <= 768) {
        setHeight(0); // 모바일은 일반 가로 스와이프로 대체 (CSS)
        return;
      }
      const extra = track.scrollWidth - window.innerWidth;
      setHeight(Math.max(extra, 0) + window.innerHeight);
    };

    calc();
    window.addEventListener('resize', calc);
    const imgs = trackRef.current ? Array.from(trackRef.current.querySelectorAll('img')) : [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', calc);
    });
    return () => {
      window.removeEventListener('resize', calc);
      imgs.forEach((img) => img.removeEventListener('load', calc));
    };
  }, []);

  // 스크롤 진행도에 따라 트랙을 가로로 이동
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        const track = trackRef.current;
        if (!wrap || !track) return;
        if (window.innerWidth <= 768) {
          track.style.transform = '';
          return;
        }
        const total = wrap.offsetHeight - window.innerHeight;
        const progressed = clamp(-wrap.getBoundingClientRect().top, 0, total);
        const maxX = track.scrollWidth - window.innerWidth;
        const x = total > 0 ? (progressed / total) * maxX : 0;
        track.style.transform = `translate3d(${-x}px, 0, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [height]);

  return (
    <section
      className={styles.wrap}
      ref={wrapRef}
      style={height ? { height: `${height}px` } : undefined}
      aria-label="브랜드 갤러리"
    >
      <div className={styles.sticky}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>BLACKUP STORY</p>
          {/* <h2 className={styles.title}>Lookbook</h2> */}
        </div>
        <div className={styles.track} ref={trackRef}>
          {IMAGES.map((src, idx) => (
            <figure className={styles.panel} key={idx}>
              <img
                src={optimizeCloudinaryUrl(src, 1000)}
                alt={`gallery ${idx + 1}`}
                loading={idx < 2 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
