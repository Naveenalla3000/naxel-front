import React from 'react'
import { Link } from 'react-router-dom';
const OrderedProduct = ( { product } ) => {
  const generateRandomNumber = () => {
    const min = 10;
    const max = 30;
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  };
  const blockStyle = 'block bg-green-600 text-white text-base px-2 rounded-sm mb-2'
  return (
    <div className='flex h-72 bg-white rounded-lg hover:drop-shadow-lg border-gray-300 border'>
      <div className='w-1/4 border-1 border-red-300 m-auto p-4 grid items-center justify-center'>
        <Link to={ `/products/${ product.product }` }>
          <img className='h-60' src={ product.productImageUri } alt='product' />
        </Link>
      </div>
      <div className='w-3/4 border-0 border-red-200 py-4 pl-4'>
        <p className='text-4xl font-light'>{ product.productName }</p>
        <p className='font-medium text-sm py-4'>{ product.productDescription }</p>
        <div className='px-4'>
          <button className={ blockStyle }>{ product.productRating } ★</button>
          <div className='flex text-lg'>
            <p className='mr-5'>$ { product.productNewPrice } USD</p>
            <p className='mr-5 strikethrough'>$ { product.productOldPrice } USD</p>
            <p>{ product.productDiscount }% off</p>
          </div>
          <div className='flex my-4'>
            <button className='text-white bg-yellow-500 p-1 mr-4 rounded-sm font-semibold'>Ordered</button>
            <p className='text-red-700 font-semibold p-1'>* Arriving on { generateRandomNumber() } August</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderedProduct