import React from 'react';
import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';
import RollingBanner from '../components/RollingBanner';
import RollingCategory from '../components/RollingCategory';
import SlideProduct from '../components/SlideProduct';

export default function Home() {
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
