import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import AdminLayout from './layouts/admin/AdminLayout';
import PublicLayout from './layouts/frontend/PublicLayout';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';

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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<PublicLayout />} > 
          <Route path='/*' element={ <PublicRoutes /> } />
          <Route 
            path='/register'
            element={ localStorage.getItem('auth_token') ? <Navigate to="/home" /> : <Register /> }
          />
          <Route 
            path='/login'
            element={ localStorage.getItem('auth_token') ? <Navigate to="/home" /> : <Login /> }
          />
        </Route>  

        <Route path="/" element={<AdminLayout />} > 
          <Route path='/admin/*' element={ <AdminRoutes /> } />
        </Route>  

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
