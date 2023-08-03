import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shop from '/ShopingImageAtHomePage.png';
import Products from './Products';
import BackToTop from './BackToTop';
import Footer from './Footer';
import People from './People';

const Home = () => {
  const buttonStyle = 'rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 hover:from-green-500 hover:to-blue-500 text-white text-lg font-semibold p-2 w-80 block mb-3 duration-1000 shadow-md border-2 border-blue-300';
  const [ imageWidth, setImageWidth ] = useState( '6/12' );
  useEffect( () => {
    const timer = setTimeout( () => {
      setImageWidth( '8/12' );
    }, 100 );
    return () => {
      clearTimeout( timer )
    }
  }, [] );

  const imageStyle = {
    width: `calc(100% * ${ imageWidth })`,
    height: 'auto',
  };
  return (
    <div>
      <div className='h-screen text-center md:flex md:text-left scroll-smooth' style={ { background: "#FFFFFF" } }>
        <div className='w-full md:w-2/3 flex justify-center items-center md:order-2'>
          <img
            className='cursor-pointer w-6/12 rounded-2xl hover:w-8/12 duration-1000 mt-10'
            src={ shop }
            alt='shop'
            style={ imageStyle }
          />
        </div>
        <div className='w-full md:w-2/5 relative pl-24 sm:pl-36 md:pl-20 md:order-1'>
          <div className='text-center md:text-left items-center justify-center m-auto absolute top-1/3 md:top-1/2 md:transform md:-translate-y-1/2'>
            <p className='text-3xl font-thin mb-4'><em>Are you looking for shopping online..</em></p>
            <marquee className='font-bold text-2xl mb-4 text-gray-800 hidden md:block'>Flat 60% discount on new arrivals</marquee>
            <Link to='/products'>
              <button className={ buttonStyle }>
                <p className='drop-shadow-2xl w-1/3 m-auto duration-300'>Order Now</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Products />
      <BackToTop />
    </div>
  );
};
export default Home;
