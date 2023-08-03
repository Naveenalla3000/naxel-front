import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartFromAPI } from '../features/CartSlice.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import CartProduct from './CartProduct';
import { FadeLoader } from 'react-spinners';
import Footer from './Footer.jsx';

const Cart = () => {
  const [ loading, setLoading ] = useState( true );
  const [ screenSize, setScreenSize ] = useState( 'h-screen' );
  const dispatch = useDispatch();
  const cartProducts = useSelector( ( state ) => state.cart );

  useEffect( () => {
    const fetchCartProducts = async () => {
      try {
        const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
        const token = localStorage.getItem( 'token' ).slice( 1, -1 )
        const res = await axios.get( `https://naxel-back.onrender.com/api/fav/${ userId }`,{
          headers: {
            authorization: `Bearer ${ token }`
          }
        } );
        if ( res.status === 200 ) {
          if ( res.data.length === 0 ) {
            toast.success( 'User has no products in cart' );
          }
          if ( res.data.length > 3 ) {
            setScreenSize( 'h-full' );
          }
        }
      } catch ( err ) {
        if ( err.response?.data?.error === 'Your cart is empty' ) {
          toast.success( err.response?.data?.error || 'An error occurred' );
        } else {
          console.error( 'Error fetching products:', err );
          toast.error( err.response?.data?.error || 'An error occurred' );
        }
      } finally {
        setLoading( false );
      }
    };
    dispatch( fetchCartFromAPI() );
    fetchCartProducts();
  }, [ dispatch ] );

  if ( loading ) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-blue-100" style={ { background: "#FFFFFF" } }>
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className={ `w-full bg-blue-100 ${ screenSize }` } style={ { background: '#FFFFFF' } }>
      <div className='grid grid-cols-1 gap-20 py-10 px-10 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3'>
        { cartProducts.length === 0 ? (
          <p className='text-2xl text-black'>Your cart is empty</p>
        ) : (
          cartProducts.map( ( product ) => (
            <CartProduct key={ product._id } product={ product } />
          ) )
        ) }
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
