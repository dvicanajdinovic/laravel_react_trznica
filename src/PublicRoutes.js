import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Home from './components/frontend/Home';
import AboutUs from './components/frontend/AboutUs';
import Contacts from './components/frontend/Contacts';
import Categories from './components/frontend/Categories';
import Shops from './components/frontend/Shops';
import ProductsByCategory from './components/frontend/ProductsByCategory';
import ProductsByShop from './components/frontend/ProductsByShop';
import Product from './components/frontend/Product';
import Cart from './components/frontend/Cart';
import Checkout from './components/frontend/Checkout';
import OrderPlaced from './components/frontend/OrderPlaced';

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://localhost:8000/";


function PublicRoutes() {

  return (
    <Routes>
          <Route path='/home'  element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/shops' element={<Shops />} />
          <Route path='/categories/:categoryKeyname' element={<ProductsByCategory />} />
          <Route path='/shops/:shopKeyname' element={<ProductsByShop />} />
          <Route path='/categories/:categoryKeyname/:productKeyname' element={<Product />} />
          <Route path='/my-shopping-cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-placed' element={<OrderPlaced />} />
     </Routes>
  );

}

export default PublicRoutes;