import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();
  // console.log(products)
  return (
    <div 
      style={{ position: "relative" }}
      title="CART"
    >
      <AiOutlineShoppingCart
        style={{ 
          fontSize: "2.25rem", 
          lineHeight: "2.5rem" 
        }}
      />
      {products && (
        <span
          style={{
            position: "absolute",
            top: "-0.25rem",
            right: "-0.5rem",
            width: "1.5rem",
            lineHeight: "1.5rem",
            borderRadius: "9999px",
            backgroundColor: "black",
            textAlign: "center",
            fontWeight: "700",
            color: "white",
          }}
        >
          {products.length}
        </span>
      )}
    </div>
  );
}
