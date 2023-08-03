import React from 'react'
import NavBar from './components/NavBar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import Orders from './components/Orders.jsx'
import Wish from './components/Wish.jsx'
import { useSelector } from 'react-redux'
import { selectUser } from './features/UserSlice.js'
import Profile from './components/Profile.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductWholePage from './components/ProductWholePage.jsx'
import Footer from './components/Footer.jsx'
import People from './components/People.jsx'


const App = () => {
  const user = useSelector( selectUser )
  return (
    <Router>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={ user ? <Home /> : <Login /> } />
        <Route path='/products/:_id' element={ user ? <ProductWholePage /> : <Login /> } />
        <Route path='/home' element={ user ? <Home /> : <Login /> } />
        <Route path='/register' element={ user ? <Home /> : <Register /> } />
        <Route path='/login' element={ user ? <Home /> : <Login /> } />
        <Route path='/products' element={ user ? <Products /> : <Login /> } />
        <Route path='/cart' element={ user ? <Cart /> : <Login /> } />
        <Route path='/wish' element={ <Wish /> } />
        <Route path='/profile' element={ user ? <Profile /> : <Login /> } />
        <Route path='/orders' element={ user ? <Orders /> : <Login /> } />
      </Routes>
    </Router>
  )
}
export default App