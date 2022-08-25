import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import AdminAccount from './components/admin/AdminAccount';
import Dashboard from './components/admin/Dashboard';
import AddCategory from './components/admin/categories/AddCategory';
import Category from './components/admin/categories/Category';
import Categories from './components/admin/categories/Categories';
import AddProduct from './components/admin/products/AddProduct';
import Products from './components/admin/products/Products.js';
import Product from './components/admin/products/Product.js';
import AddShop from './components/admin/shops/AddShop';
import Shops from './components/admin/shops/Shops.js';
import Shop from './components/admin/shops/Shop.js';
import Orders from './components/admin/orders/Orders.js';
import Order from './components/admin/orders/Order.js';
import Login from './components/frontend/auth/Login';

import axios from 'axios';
import swal from 'sweetalert';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://localhost:8000/";


function AdminRoutes() {
  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/checkUser`).then(res => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setLoading(false);
    });

    return () => {
      setAuthenticated(false);
    };
  }, []);

  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err.response.status === 401) {
      swal("Unauthorized.", err.response.data.internal_message, "warning");
      navigate('/home');
    }
    return Promise.reject(err);
  });

  axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 403) { 
        //Access denied
        swal("Access denied!", error.response.data.internal_message, "warning");
        navigate('/403');
      } else if (error.response.status === 404) {
        //Page not found
        swal("404 Error", 'Url/Page Not Found', "warning");
        navigate('/404');
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Dohvaćanje podataka u tijeku...</h1>
  }

  return (
    <Routes>
      <Route path='dashboard' element={ Authenticated ? <Dashboard /> : <Login/> } />
      <Route path='account' element={ Authenticated ? <AdminAccount /> : <Login/> } />

      <Route path='categories' element={ Authenticated ? <Categories /> : <Login/> } />
      <Route path='add-category' element={ Authenticated ? <AddCategory /> : <Login/> } />
      <Route path='categories/:categoryId' element={ Authenticated ? <Category /> : <Login/> } />

      <Route path='shops' element={ Authenticated ? <Shops /> : <Login/> } />
      <Route path='add-shop' element={ Authenticated ? <AddShop /> : <Login/> } />
      <Route path='shops/:shopId' element={ Authenticated ? <Shop /> : <Login/> } />

      <Route path='products' element={ Authenticated ? <Products /> : <Login/> } />
      <Route path='add-product' element={ Authenticated ? <AddProduct /> : <Login/> } />
      <Route path='products/:productId' element={ Authenticated ? <Product /> : <Login/> } />

      <Route path='orders' element={ Authenticated ? <Orders /> : <Login/> } />
      <Route path='orders/:orderId' element={ Authenticated ? <Order /> : <Login/> } />
     </Routes>
  );
}

export default AdminRoutes;