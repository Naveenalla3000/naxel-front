import React, { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';
import { toast } from 'react-toastify'
import { FadeLoader } from 'react-spinners';
import Footer from './Footer';
import People from './People';
const Products = () => {
  const [ products, setProducts ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  useEffect( () => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem( 'token' ).slice( 1, -1 )
        const res = await axios.get( 'http://localhost:4000/api/products', {
          headers: {
            authorization: `Bearer ${ token }`
          }
        } );
        if ( res.statusText == "OK" ) {
          setProducts( res?.data?.allProducts );
        }
      } catch ( err ) {
        console.error( 'Error fetching products:', err );
        toast.error( err.response?.data?.error || 'An error occurred' );
      }
      finally {
        setLoading( false );
      }
    };
    fetchProducts();
  }, [] );
  if ( loading ) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-blue-100" style={ { background: "#FFFFFF" } }>
        <FadeLoader color="#3B82F6" />
      </div>
    );
  }
  return (
    <div className='w-full scroll-smooth h-full' style={ { background: '#FFFFFF' } }>
      <div className='grid grid-cols-1 gap-20 py-10 px-10 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4'>
        { products.map( ( product ) => (
          <Product key={ product._id } product={ product } />
        ) ) }
      </div>
      <div>
        <People />
      </div>
      <Footer />
    </div>
  );
};
export default Products;
