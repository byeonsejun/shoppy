import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";

import User from "./User";
import PopUp from './PopUp';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, logout, popUp, setPopUp } = useAuthContext();
  const [categorys] = useState([
    "women","men","accessories"
  ])

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <div className='shop-btt uppercase'>
          shop
          <ul className='product-list'>
            {
              categorys.map((category, idx)=>{
                return (
                  <li key={idx}>
                    <Link className='product-item capitalize' to={`/shop/${category}`}>
                      {category}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <Link to="wish"> ❤️ </Link>
        { user && <Link to="/carts"><CartStatus /></Link> }
        {
          user && user.isAdmin && (
          <Link to="/shop/new" className="text-2xl">
            <BsFillPencilFill />
          </Link> )
        }
        { user && <User user={user} /> }
        {
          !user ? 
          <button onClick={() => setPopUp(true)}>Login</button> :
          <button onClick={logout}>Logout</button>
        }
        { popUp && <PopUp /> }
      </nav>
    </header>
  );
}
