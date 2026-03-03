import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';

const AllProducts = React.lazy(() => import('./pages/AllProducts'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const NewProduct = React.lazy(() => import('./pages/NewProduct'));
const MyCart = React.lazy(() => import('./pages/MyCart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Products = React.lazy(() => import('./components/Products'));
const LocalWish = React.lazy(() => import('./pages/LocalWish'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));

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
          <ProtectedRoute requireAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },

      { path: '/shop/OUTER/:id', element: <ProductDetail /> },
      { path: '/shop/DENIM/:id', element: <ProductDetail /> },
      { path: '/shop/SHOES/:id', element: <ProductDetail /> },

      { path: '/wish', element: <LocalWish /> },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/account',
        element: (
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
