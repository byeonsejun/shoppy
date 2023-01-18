import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPencilFill, BsSearch } from "react-icons/bs";

import User from "./User";
import PopUp from "./PopUp";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

import styles from "./css/Navbar.module.css";

export default function Navbar() {
  const { user, logout, popUp, setPopUp } = useAuthContext();
  const [categorys] = useState(["OUTER", "DENIM", "SHOES"]);

  const navigate = useNavigate();

  const [mbMenuTF, setMbMenuTF] = useState(styles.mbMenuF);
  const [searchShow, setSearchShow] = useState(styles.searchN);
  const [searchValue, setSearchValue] = useState("");

  const menuBttFn = () => {
    mbMenuTF === styles.mbMenuF
      ? setMbMenuTF(styles.mbMenuT)
      : setMbMenuTF(styles.mbMenuF);
  };

  const searchOnOff = () => {
    searchShow === styles.searchN
      ? setSearchShow(styles.searchS)
      : setSearchShow(styles.searchN);
  };

  const goToSearch = (e) => {
    e.preventDefault();
    setSearchValue("");
    setSearchShow(styles.searchN);
    navigate(`/shop/?s=${searchValue}`);
  };

  return (
    <header className={styles.header}>
      <button type="button" className={mbMenuTF} onClick={() => menuBttFn()}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={mbMenuTF}>
        <nav className={styles.shopList}>
          <div className={styles.shopBox}>
            shop
            <ul className={styles.productList}>
              {categorys.map((category, idx) => {
                return (
                  <li key={idx} className={styles.productItem}>
                    <Link to={`/shop/${category}`}>{category}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.searchBox} onClick={searchOnOff}>
            SEARCH
          </div>
          <div className={searchShow}>
            {/* <div className={styles.searchBoxInner}> */}
              <form onSubmit={goToSearch} className={styles.searchBoxInner}>
                <input
                  type="text"
                  name="search"
                  placeholder="상품명을 입력해주세요."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  className={styles.searchIconBox}
                  // onClick={goToSearch}
                >
                  <BsSearch className={styles.searchIcon} />
                </button>
              </form>
            {/* </div> */}
          </div>
        </nav>
        <h1 className={styles.logo}>
          <Link to="/">
            <span className="blind">BLACKUP</span>
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
                fontSize: "1.5rem",
                lineHeight: "2rem",
              }}
              title="관리자 상품등록 페이지"
            >
              <BsFillPencilFill />
            </Link>
          )}
          {user && <User user={user} />}
          {!user ? (
            <button
              className={styles.loginButton}
              onClick={() => setPopUp(true)}
            >
              Login
            </button>
          ) : (
            <button className={styles.loginButton} onClick={logout}>
              Logout
            </button>
          )}
          {popUp && <PopUp />}
        </nav>
      </div>
    </header>
  );
}
