import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useAccount from '../hooks/useAccount';

import styles from './css/MyAccount.module.css';

export default function MyAccount() {
  const { user } = useAuthContext();
  const { addOrUpdateMyAccount } = useAccount();

  const [myAccount, setMyAccount] = useState({});
  // console.log(user);
  
  // 폼안에 넣을거 이름(고정), 주소 , 전화번호, 이메일, 수정확인버튼, 취소버튼(홈으로)
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setMyAccount((myAccount) => ({ ...myAccount, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    const account = { 
      id: user.uid,
      address: "address",
      phonNumber: "01088957698",
      email: "byeonsejun@naver.com",
    }
    addOrUpdateMyAccount.mutate(account, {
      onSuccess: () => {
        // console.log("성공");
        // setSuccess('장바구니에 추가 되었습니다.');
        // setTimeout(()=> setSuccess(null), 3000);
      }
    });
  };


  return (
    <section>
      <h2>My Account</h2>
      <br></br>
      <form className={styles.form} onSubmit={handleSubmit}>
        {
          user && 
          <input
            type="text"
            name="name"
            readOnly
            placeholder={ user.displayName}
            onChange={handleChange}
          />
        }
        {/* <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <select
          className={styles.category}
          name="category"
          // value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        >
          <option value="">카테고리 선택</option>
          {categorys.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        /> */}
        {/* <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        /> */}
      </form>
    </section>
  );
}

