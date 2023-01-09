import React from 'react';
import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';
import RollingBanner from '../components/RollingBanner';
import RollingCategory from '../components/RollingCategory';
import SlideProduct from '../components/SlideProduct';

import useProducts from '../hooks/useProducts';
import FadeLoader from "react-spinners/FadeLoader";

export default function Home() {
  const { productsQuery: { isLoading } } = useProducts();

  if(isLoading) return <FadeLoader color="gray" loading={isLoading} size={25} cssOverride={{ position: "fixed", left: "50%", top: "50%", }} />
  
  return (
    <>
      <MainBanner />
      <RollingBanner />
      <SlideProduct info={"NEW"}/>
      <RollingCategory />
      <SlideProduct info={"HOT"}/>
      <SlideProduct info={"BEST"}/>
      <Footer />
    </>
  )
}
