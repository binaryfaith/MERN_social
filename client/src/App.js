import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//Redux
import store from './store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Alert />
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
