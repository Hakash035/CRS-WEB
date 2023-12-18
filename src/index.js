import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Register from './Register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import ForgotPass from './ForgotPass';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
        <Routes>
            <Route index element={<PrivateRoute><App/></PrivateRoute>} path='/'/>
            <Route element={<Login/>} path='/login' />
            <Route element={<Register/>} path='/register'/>
            <Route element={<ForgotPass/>} path='/forgotPass'/>
        </Routes>
    </BrowserRouter>
  </AuthProvider>
);

