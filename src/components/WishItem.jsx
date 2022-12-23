import React from "react";
import { useNavigate } from "react-router-dom";

export default function WishItem({
  product,
  product: { id, image, title, price, category },
  deleteWish,
}) {
  const navigate = useNavigate();
  function goToDetail(link1, link2) {
    navigate(`/shop/${link1}/${link2}`, { state: { product } });
  }

  return (
    <li className="flex justify-between my-2 items-center ">
      <img
        src={image}
        alt={title}
        className="w-24 rounded-lg md:w-48 cursor-pointer"
        onClick={() => goToDetail(category, id)}
      />
      <div className="flex-1 flex justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-md  text-gray-700">{category}</p>
          <p className="text-lg">{title}</p>
          <p>￦{price}</p>
        </div>
      </div>
      <span 
        className="font-bold cursor-pointer" 
        onClick={() => deleteWish(id)}
      >
        X
      </span>
    </li>
  );
}
