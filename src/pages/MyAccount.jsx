import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useAccount from '../hooks/useAccount';
import useCart from '../hooks/useCart';

import styles from './css/MyAccount.module.css';

import FadeLoader from 'react-spinners/FadeLoader';

export default function MyAccount() {
  const { user } = useAuthContext();
  const {
    cartQuery: { isLoading },
  } = useCart();
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
      address: 'address',
      phonNumber: '01088957698',
      email: 'byeonsejun@naver.com',
    };
    addOrUpdateMyAccount.mutate(account, {
      onSuccess: () => {
        // console.log("성공");
        // setSuccess('장바구니에 추가 되었습니다.');
        // setTimeout(()=> setSuccess(null), 3000);
      },
    });
  };

  // if (isLoading) {
  //   return (
  //     <FadeLoader
  //       color="gray"
  //       loading={isLoading}
  //       size={25}
  //       cssOverride={{ position: "fixed", left: "50%", top: "50%" }}
  //     />
  //   );
  // }

  return (
    <section className={`pageShell ${styles.section}`}>
      <div className="pageHeader center">
        <span className="pageEyebrow">MY PAGE</span>
        <h2 className="pageTitle">My Account</h2>
      </div>

      <div className={styles.card}>
        {user && (
          <div className={styles.profile}>
            {user.photoURL && (
              <img className={styles.avatar} src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
            )}
            <div>
              <p className={styles.name}>{user.displayName}</p>
              {user.email && <p className={styles.email}>{user.email}</p>}
            </div>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>이름</label>
          {user && <input type="text" name="name" readOnly defaultValue={user.displayName} onChange={handleChange} />}
          <Button text="정보 수정" fullWidth />
        </form>
      </div>
    </section>
  );
}
