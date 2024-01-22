import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './css/NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.pageWrap}>
        <h2>Error</h2>
        <article>
          <img
            src="https://res.cloudinary.com/daqjqq0hy/image/upload/v1705894926/loc0pmff7yhfqo8pm8r0.webp"
            alt="errorPage"
          />
          <strong>찾으시는 페이지가 없습니다.</strong>
          <p>
            잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다. 입력하신 페이지의 주소가 정확한지 다시 한번 확인해
            주시기 바랍니다.
          </p>
          <button onClick={() => navigate(`/`, { replace: true })}>홈으로</button>
        </article>
      </section>
    </>
  );
}
