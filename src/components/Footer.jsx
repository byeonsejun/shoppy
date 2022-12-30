import React from 'react';
import styles from './css/Footer.module.css';

import { BsInstagram, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <div className={styles.top}>
        <ul>
          <li className={styles.not}>이용약관</li>
          <li>이용안내</li>
          <li>개인정보처리방침</li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <ul className={styles.left}>
          <li className={styles.not}><BsInstagram /></li>
          <li className={styles.not}><BsYoutube /></li>
          <li>도움말</li>
          <li>배송</li>
          <li>교환/반품/환불</li>
          <li>인재채용</li>
          <li>제휴문의</li>
        </ul>
        <ul className={styles.right}>
          <li className={styles.not}> COMPANY:(주)블랙업 </li>
          <li>OWNER:최예나래</li>
          <li>TEL:1566-6813</li>
          <li>EMAIL:contact@black-up.co.kr</li>
          <li>BUSINESS LICENSE:419-87-00807</li>
          <li>E-COMMERCE PERMIT:제 2017-서울마포-2273호</li>
          <li>ADDRESS: 03992  서울특별시 마포구 동교로23길 32-22 (동교동)JC동교빌딩 4층</li>
        </ul>
      </div>
    </footer>
  );
}

