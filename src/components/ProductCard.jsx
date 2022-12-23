import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, getWishItem, wishFlag }) {
  const navigate = useNavigate();
  const [nowResult, setNowResult] = useState(null);

  const findWish = () => {
    let myWishs = JSON.parse(localStorage.getItem("wishItem"));
    const itemResult = myWishs.some((myWish) => myWish.id === product.id);
    // console.log(product.id); //현재의 id
    // console.log(itemResult); // 현재의 리설트값
    // 로컬스토리지에 있으면 true 없으면 false
    setNowResult(itemResult);
  }
  
  useEffect(()=> {
    findWish();
  },[wishFlag]);

  return (
    <div className='relative'>
      <span 
        className='p-1 bg-white text-cyan-50 absolute z-10 right-2 top-2 cursor-pointer'
        onClick={() => getWishItem(product)}
      >
        { nowResult ? "❤️" : "🖤" }
      </span>
      <li 
        className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 '
        onClick={()=> {navigate(`/shop/${product.category}/${product.id}`, { state: { product } })}}
      >
        <img className='w-full' src={product.image} alt={product.title} />
        <div className='mt-2 px-2 text-lg '>
          <h3 className='truncate'>{product.title}</h3>
          <p>{`₩${product.price}`}</p>
        </div>
        <p className='mb-2 px-2 text-gray-600'>{product.category}</p>
      </li>
    </div>
  );
}

