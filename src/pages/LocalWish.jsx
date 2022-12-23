import React, { useState } from "react";
import WishItem from "../components/WishItem";

export default function LocalWish() {
  const [myWishItem, setMyWishItem] = useState(
    JSON.parse(localStorage.getItem("wishItem"))
  );
  const hasWishs = myWishItem && myWishItem.length > 0;

  function deleteWish(itemId) {
    const myWishs = myWishItem.filter((item) => item.id !== itemId);
    localStorage.setItem("wishItem", JSON.stringify(myWishs));
    setMyWishItem(myWishs);
  }

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내가 찜한상품
      </p>
      {!hasWishs && <p>장바구니에 상품이 없습니다.</p>}
      {hasWishs && (
        <ul className="border-b border-gray-300 mb-8 p-4 px-8">
          {myWishItem &&
            myWishItem.map((product) => {
              return (
                <WishItem
                  key={product.id}
                  product={product}
                  deleteWish={deleteWish}
                />
              );
            })}
        </ul>
      )}
    </section>
  );
}
