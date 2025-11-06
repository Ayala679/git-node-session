import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./comp/header/header"
import Categories from "./comp/header/categories"
import Login from "./comp/layout/user/login"
import Basket from "./comp/layout/basket/getBasket"
import Products from "./comp/layout/product/allProducts"
import Register from "./comp/layout/user/register"
import Product from './comp/layout/product/product'
import ProductByCategory from './comp/layout/product/productByCategory'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import userSlice  from './redux/userSlice';
import HomePage from './comp/homePage';
function App() {
  const myStore = configureStore({
    reducer:{
      userSlice
    }
  })

  return (
    <div className="App" >
      <Provider store = {myStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Header><Categories /><HomePage/></Header>}></Route>
            <Route path="/login" element={<Header><Login /></Header>}></Route>
            <Route path="/basket" element={<Header><Categories /><Basket /></Header>}></Route>
            <Route path="/categories" element={<Header><Categories /></Header>}></Route>
            <Route path="/products" element={<Header><Categories /><Products /></Header>}></Route>
            <Route path="/products/:_id" element={<Header><Categories /><Product /></Header>}></Route>
            <Route path="/register" element={<Header><Register /></Header>}></Route>
            <Route path="/productByCategory/:category" element={<Header><Categories /><ProductByCategory /></Header>}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
