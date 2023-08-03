import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersFromAPI } from '../features/OrderSlice.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrderedProduct from './OrderedProduct.jsx';
import { FadeLoader } from 'react-spinners';
import BackToTop from './BackToTop.jsx';
import Footer from './Footer.jsx';

const Orders = () => {
  const [ loading, setLoading ] = useState( true );
  const dispatch = useDispatch();
  const [ screenSize, setScreenSize ] = useState( 'h-screen' );
  const orderedProduct = useSelector( ( state ) => state.order );
  useEffect( () => {
    const fetchOrderedProducts = async () => {
      try {
        const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
        const token = localStorage.getItem( 'token' ).slice( 1, -1 )
        const res = await axios.get( `http://localhost:4000/api/orders/${ userId }`, {
          headers: {
            authorization: `Bearer ${ token }`
          }
        } );
        if ( res.status === 200 ) {
          if ( res.data.length === 0 ) {
            toast.success( 'User has no orders' );
          }
          if ( res.data.length >= 3 ) {
            setScreenSize( 'h-full' );
          }
        }
      }
      catch ( err ) {
        if ( err.response?.data?.error === 'Your orders are empty' ) {
          toast.success( err.response?.data?.error || 'An error occurred' );
        } else {
          console.error( 'Error fetching products:', err );
          toast.error( err.response?.data?.error || 'An error occurred' );
        }
      }
      finally {
        setLoading( false )
      }
    }
    dispatch( fetchOrdersFromAPI() );
    fetchOrderedProducts();
  }, [ dispatch ] )
  if ( loading ) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-blue-100" style={ { background: "#FFFFFF" } }>
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className={ `w-full bg-blue-100 h-full ${ screenSize }` } style={ { background: "#FFFFFF" } }>
      <div className='grid grid-cols-1 gap-20 py-10 px-10'>
        { orderedProduct.length === 0 ? (
          <p className='text-2xl text-black'>Your have no orders</p>
        ) : (
          orderedProduct.map( ( product ) => (
            <OrderedProduct key={ product._id } product={ product } />
          ) )
        ) }
      </div>
      <BackToTop />
      <Footer/>
    </div>
  )
}

export default Orders