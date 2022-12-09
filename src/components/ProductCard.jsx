import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  return (
    <li 
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 '
      onClick={()=> {navigate(`/products/${product.id}`, { state: { product } })}}
    >
      <img className='w-full' src={product.image} alt={product.title} />
      <div className='mt-2 px-2 text-lg '>
        <h3 className='truncate'>{product.title}</h3>
        <p>{`₩${product.price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{product.category}</p>
    </li>
  );
}

