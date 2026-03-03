import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsSearch } from 'react-icons/bs';

import User from './User';
import PopUp from './PopUp';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

import styles from './css/Navbar.module.css';

export default function Navbar() {
  const { user, logout, popUp, setPopUp } = useAuthContext();
  const [categorys] = useState(['OUTER', 'DENIM', 'SHOES']);

  const navigate = useNavigate();

  const [mbMenuTF, setMbMenuTF] = useState(styles.mbMenuF);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const menuBttFn = (closeMenu = true) => {
    if (closeMenu === true) {
      setMbMenuTF(styles.mbMenuF);
      return;
    }
    mbMenuTF === styles.mbMenuF ? setMbMenuTF(styles.mbMenuT) : setMbMenuTF(styles.mbMenuF);
  };

  const searchOnOff = (e) => {
    e.stopPropagation(); // 이벤트가 상위(document)로 전파되어 전역 핸들러가 실행되는 것을 막습니다.
    setIsSearchVisible((prev) => !prev);
  };

  const goToSearch = (e) => {
    e.preventDefault();
    setSearchValue('');
    setIsSearchVisible(false);
    navigate(`/shop/?s=${searchValue}`);
  };

  useEffect(() => {
    if (!isSearchVisible) return;

    const handleWindowClick = () => setIsSearchVisible(false);
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [isSearchVisible]);

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={mbMenuTF}
        onClick={() => menuBttFn('이거아님?')}
        aria-label="메뉴 열기"
      >
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
                    <Link to={`/shop/${category}`} onClick={() => menuBttFn(true)}>
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            id="search_button"
            className={styles.searchBox}
            onClick={searchOnOff}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key !== 'Enter' && e.key !== ' ') return;
              e.preventDefault();
              searchOnOff(e);
            }}
            aria-label="검색 열기"
          >
            SEARCH
          </div>
          <div
            className={styles.searchS}
            id="search_div"
            style={{ display: isSearchVisible ? 'flex' : 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={goToSearch} className={styles.searchBoxInner}>
              <input
                id="search_input"
                type="text"
                name="search"
                placeholder="상품명을 입력해주세요."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className={styles.searchIconBox} aria-label="검색">
                <BsSearch className={styles.searchIcon} />
              </button>
            </form>
          </div>
        </nav>
        <h1 className={styles.logo}>
          <Link to="/" onClick={() => menuBttFn(true)}>
            <span className="blind">BLACKUP</span>
          </Link>
        </h1>
        <nav className={styles.navMenu}>
          <Link to="/wish" onClick={() => menuBttFn(true)}>
            WISHLIST
          </Link>
          {user && (
            <Link to="/carts" onClick={() => menuBttFn(true)}>
              <CartStatus />
            </Link>
          )}
          {user && user.isAdmin && (
            <Link
              to="/shop/new"
              style={{
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
              title="관리자 상품등록 페이지"
              onClick={() => menuBttFn(true)}
            >
              <BsFillPencilFill />
            </Link>
          )}
          {user && <User user={user} />}
          {!user ? (
            <button
              className={styles.loginButton}
              onClick={() => setPopUp(true)}
              aria-label="로그인"
            >
              Login
            </button>
          ) : (
            <button
              className={styles.loginButton}
              onClick={async () => {
                await logout();
                menuBttFn(true);
              }}
              aria-label="로그아웃"
            >
              Logout
            </button>
          )}
          {popUp && <PopUp />}
        </nav>
      </div>
    </header>
  );
}
