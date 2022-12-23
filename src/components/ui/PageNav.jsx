import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNav({sliceUrl}) {
  return (
    <div className='text-center'>
      {
        !sliceUrl ?
          <><Link to="/">Home</Link> / <span className='font-bold'>Shop</span></>
        :
          <><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className='font-bold'>{sliceUrl}</span></>
      }
    </div>
  );
}

