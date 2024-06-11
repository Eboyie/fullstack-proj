import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { StoreProvider } from './Store.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import App from './App.tsx';
import './index.css';
import {
  LandingPage,
  ProductPage,
  CartPage,
  SigninPage,
  SignupPage,
  ShipmentPage,
  PaymentMethodPage,
  PlaceOrderPage,
  OrderPage,
  OrderHistoryPage,
  SearchPage,
  ProfilePage,
} from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<LandingPage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShipmentPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="orderhistory" element={<OrderHistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ clientId: 'sb' }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
