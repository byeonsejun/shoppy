import React, { lazy, Suspense } from 'react';

import Footer from '../components/Footer';
import MainBanner from '../components/MainBanner';
import useProducts from '../hooks/useProducts';
import FadeLoader from 'react-spinners/FadeLoader';

const LazySlideProduct = lazy(() => import('./../components/SlideProduct'));
const LazyHorizontalScroll = lazy(() => import('../components/HorizontalScroll'));
const LazyCategoryShowcase = lazy(() => import('../components/CategoryShowcase'));

export default function Home() {
  const {
    productsQuery: { isLoading },
  } = useProducts();

  return (
    <>
      <MainBanner />
      {isLoading && (
        <FadeLoader
          color="gray"
          loading={isLoading}
          size={25}
          cssOverride={{ position: 'fixed', left: '50%', top: '50%' }}
        />
      )}
      {!isLoading && (
        <>
          <Suspense fallback={null}>
            <LazyCategoryShowcase />
          </Suspense>

          <Suspense fallback={<FadeLoader color="gray" size={25} />}>
            <LazySlideProduct info={'NEW'} />
          </Suspense>

          <Suspense fallback={null}>
            <LazyHorizontalScroll />
          </Suspense>

          <Suspense fallback={<FadeLoader color="gray" size={25} />}>
            <LazySlideProduct info={'HOT'} />
          </Suspense>

          <Suspense fallback={<FadeLoader color="gray" size={25} />}>
            <LazySlideProduct info={'BEST'} />
          </Suspense>

          <Footer />
        </>
      )}
    </>
  );
}
