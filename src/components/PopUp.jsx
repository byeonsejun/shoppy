import React from "react";
import styles from "./css/PopUp.module.css";
import { useAuthContext } from "../context/AuthContext";

export default function PopUp() {
  const { platforms, setPopUp, goToLogin } = useAuthContext();

  return (
    <div className={styles.popUpWrap}>
      <div className="dimm" onClick={() => setPopUp(false)}></div>
      <div className={styles.popUp}>
        <span className={styles.modal_close} onClick={() => setPopUp(false)}>
          ×
        </span>
        <h2>로그인 인증방법을 선택하세요.</h2>
        <div className={styles.signSelect}>
          {platforms.map((platform) => {
            return (
              <div
                key={platform.name}
                className={`${platform.name}_login_btt`}
                onClick={() => goToLogin(platform.name)}
              >
                <span>{platform.icon}</span>
                {platform.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
