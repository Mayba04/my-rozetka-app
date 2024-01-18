import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/home/HomePage';
import NoMatchPage from './components/404/NoMatchPage';
import MainMenu from './components/menu/MainMenu';
import CreateCategory from './components/Category/AddCategoryForm';
import EditCategory from './components/Category/EditCategoryPage';
import RegisterUser from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import ProductListPage from './components/Product/ProductListPage';
import ProductPage from './components/Product/ProductPage';

const App: React.FC = () => {

  return (
    <>
      <MainMenu /> 
      <Routes>
        <Route  path="/products" element={<ProductListPage/>} />
        <Route path="/products/:productId"element={<ProductPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        <Route path="/sign-up" element={<RegisterUser />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </>
  );
};

export default App;
