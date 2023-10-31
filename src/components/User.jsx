import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/User.module.css";

export default function User({ user: { photoURL, displayName } }) {

  let navigate = useNavigate();

  const [switchMenu, setSwitchMenu] = useState(false);

  const sNhMyMenu = () => {
    console.log("hihi");
    setSwitchMenu(!switchMenu);
  }

  const goToMember = (link) => {
    navigate(`/${link}`);
    setSwitchMenu(false);
  };

  return (
    <div
      className={styles.userWrap}
    >
      {/* <img
        className="w-10 h-10 rounded-full mr-2"
        src={photoURL}
        alt={displayName}
        referrerPolicy="no-referrer"
      /> */}
      <span 
        className={styles.userName}
        onClick={sNhMyMenu}
      >
        {displayName}
      </span>

      {
        switchMenu ?
        <div className={styles.listWrap}>
          <ul className={styles.ul}>
            <li>주문내역</li>
            <li onClick={()=>goToMember("account")}>
            {/* <li> */}
              <span>회원정보</span>
            </li>
          </ul>
        </div> 
        : null
      }

    </div>
  );
}
