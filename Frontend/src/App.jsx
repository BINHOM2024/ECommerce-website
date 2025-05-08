import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import StoreContext from './context/StoreContext'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Contact from './pages/Contact'
import About from './pages/About'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Search from './components/Search'
import Product from './pages/Product'
 import { ToastContainer } from "react-toastify";
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Verify from './pages/Verify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <BrowserRouter>
    <StoreContext>
        <ToastContainer/>
        <NavBar />
        <Search/>
        <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/collection' element={<Collection/> } />
          <Route path='/about' element={<About/> } />
          <Route path='/contact' element={<Contact/> } />
          <Route path='/cart' element={<Cart/> } />
          <Route path='/product/:productId' element={<Product/> } />
          <Route path='/place_order' element={<PlaceOrder/> } />
          <Route path='/orders' element={<Orders/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/verify' element={<Verify/> } />
        </Routes>
        <Footer/>
    </StoreContext>
    </BrowserRouter >
  )
}

export default App