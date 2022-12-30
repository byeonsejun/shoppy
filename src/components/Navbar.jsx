import React, { useState } from "react";
import styles from "./css/Navbar.module.css";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

import User from "./User";
import PopUp from "./PopUp";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

export default function Navbar() {
  const { user, logout, popUp, setPopUp } = useAuthContext();
  const [categorys] = useState(["OUTER", "DENIM", "SHOES"]);

  return (
    <header className="">
      <nav className={styles.shopList}>
        <div className={styles.shopBox}>
          shop
          <ul className={styles.productList}>
            {categorys.map((category, idx) => {
              return (
                <li key={idx} className={styles.productItem}>
                  <Link
                    to={`/shop/${category}`}
                  >
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <h1>
        <Link to="/">
            <span className='blind'>BLACKUP</span>
        </Link>
      </h1>
      <nav className={styles.navMenu}>
        <Link to="/wish"> WISHLIST </Link>
        {user && (
          <Link to="/carts">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link 
            to="/shop/new" 
            style={{ 
              fontSize:"1.5rem", 
              lineHeight: "2rem",
            }}
            title="관리자 상품등록 페이지"
          >
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user ? (
          <button className={styles.loginButton} onClick={() => setPopUp(true)}>Login</button>
        ) : (
          <button className={styles.loginButton} onClick={logout}>Logout</button>
        )}
        {popUp && <PopUp />}
      </nav>
    </header>
  );
}
