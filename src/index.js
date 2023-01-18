import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import MyCart from './pages/MyCart';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import Products from './components/Products';
import LocalWish from './pages/LocalWish';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/shop', element: <AllProducts /> },
      { path: '/shop/OUTER', element: <Products /> },
      { path: '/shop/DENIM', element: <Products /> },
      { path: '/shop/SHOES', element: <Products /> },
      { path: '/shop/?s=:search', element: <Products /> },
      
      {
        path: '/shop/new',
        element: (
          <ProtectedRoute requireAdmin={true} >
            <NewProduct />
          </ProtectedRoute>
        ),
      },

      {
        path: '/shop/OUTER/:id',
        element: <ProductDetail />,
      },
      {
        path: '/shop/DENIM/:id',
        element: <ProductDetail />,
      },
      {
        path: '/shop/SHOES/:id',
        element: <ProductDetail />,
      },

      {
        path: '/wish',
        element: <LocalWish />,
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
