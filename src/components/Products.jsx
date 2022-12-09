import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from './ProductCard';

export default function Products() {
  const {
    iseLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);
  console.log(products)
  return (
    <>
      { iseLoading && <p>Loading...</p> }
      { error && <p>{ error }</p> }
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        { products && products.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </ul>
    </>
  )
}
