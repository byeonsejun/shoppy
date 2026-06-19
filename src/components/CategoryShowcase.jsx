import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/CategoryShowcase.module.css';
import { optimizeCloudinaryUrl } from './js/util';

const CATEGORIES = [
  {
    link: 'OUTER',
    label: 'OUTER',
    sub: '아우터',
    url: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705893288/hyi7vos1jvwvxju8fksx.webp',
  },
  {
    link: 'DENIM',
    label: 'DENIM',
    sub: '데님',
    url: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705893213/jpgh4kzvd0wjnxddqjwm.webp',
  },
  {
    link: 'SHOES',
    label: 'SHOES',
    sub: '슈즈',
    url: 'https://res.cloudinary.com/daqjqq0hy/image/upload/v1705893344/z99h7lof0v86pghlh2qk.webp',
  },
];

export default function CategoryShowcase() {
  return (
    <section className={styles.section} aria-label="카테고리 바로가기">
      <div className={styles.head}>
        <p className={styles.eyebrow}>SHOP BY CATEGORY</p>
        <h2 className={styles.title}>카테고리</h2>
      </div>
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <Link key={cat.link} to={`/shop/${cat.link}`} className={styles.tile}>
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={optimizeCloudinaryUrl(cat.url, 700)}
                alt={cat.label}
                loading="lazy"
              />
            </div>
            <span className={styles.capView}>VIEW {cat.label} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
