import React, { lazy, Suspense } from 'react';

import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';
import useProducts from '../hooks/useProducts';
import FadeLoader from 'react-spinners/FadeLoader';

const LazySlideProduct = lazy(() => import('./../components/SlideProduct'));
const LazyRollingBanner = lazy(() => import('../components/RollingBanner'));
const LazyRollingCategory = lazy(() => import('../components/RollingCategory'));

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
      <Suspense fallback={null}>
        <LazyRollingBanner />
      </Suspense>

      <Suspense fallback={<FadeLoader color="gray" size={25} />}>
        <LazySlideProduct info={'NEW'} />
      </Suspense>

      <Suspense fallback={null}>
        <LazyRollingCategory />
      </Suspense>

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
