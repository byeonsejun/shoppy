import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PopUp from '../components/PopUp';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';


export default function ProductDetail() {
  const { user, popUp, setPopUp } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    // 여기에서 장바구니에 추가하면 됨!
    if(user === null) {
      console.log("return");
      setPopUp(true);
      return 
    }
    const product = { id, image, title, price, option: selected, quantity: 1};
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가 되었습니다.');
        setTimeout(()=> setSuccess(null), 3000);
      }
    });
  };

  return (
    <>
      <p className='mx-12 mt-4 text-gray-700 font-bold capitalize  '>{category}</p>
      <section className='flex flex-col p-4 md:flex-row md:flex-wrap'>
        <div className='w-full px-4 md:basis-7/12'>
          <img className='w-full' src={image} alt={title} />
        </div>
        <div className='w-full flex flex-col p-4 md:basis-5/12 '>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          { success && <p className='my-2'>✅ {success}</p>}
          <Button text='장바구니에 추가' onClick={handleClick} />
          { popUp && <PopUp /> }
        </div>
        
      </section>
    </>
  );
}
