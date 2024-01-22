import React, { lazy, Suspense } from 'react';

import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';
import RollingBanner from '../components/RollingBanner';
import RollingCategory from '../components/RollingCategory';
import useProducts from '../hooks/useProducts';
import FadeLoader from 'react-spinners/FadeLoader';

const LazySlideProduct = lazy(() => import('./../components/SlideProduct'));

export default function Home() {
  const {
    productsQuery: { isLoading },
  } = useProducts();

  if (isLoading)
    return (
      <FadeLoader
        color="gray"
        loading={isLoading}
        size={25}
        cssOverride={{ position: 'fixed', left: '50%', top: '50%' }}
      />
    );

  return (
    <>
      <MainBanner />
      <RollingBanner />

      <Suspense fallback={<FadeLoader color="gray" size={25} />}>
        <LazySlideProduct info={'NEW'} />
      </Suspense>

      <RollingCategory />

      <Suspense fallback={<FadeLoader color="gray" size={25} />}>
        <LazySlideProduct info={'HOT'} />
      </Suspense>

      <Suspense fallback={<FadeLoader color="gray" size={25} />}>
        <LazySlideProduct info={'BEST'} />
      </Suspense>

      <Footer />
    </>
  );
}
