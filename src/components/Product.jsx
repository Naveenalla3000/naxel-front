import React, { useState } from 'react';
import BackToTop from './BackToTop';
import { add } from '../features/CartSlice.js'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Popup from './PopUp.jsx';

const Product = ( { product } ) => {
    const blockStyle = 'block bg-green-600 text-white text-base mt-3 px-2 rounded-sm'
    const popBlockStyle = 'block bg-green-600 text-white text-base mt-3 px-2 rounded-sm w-fit'
    const [ heart, setHeart ] = useState( '🤍' )
    const toggleHartColor = () => {
        if ( heart === '🤍' ) {
            setHeart( '❤️' )
            return;
        }
        setHeart( '🤍' )
    }
    const buttonStylesGreen = 'border-double py-1 px-1 w-10/12 bg-green-600 rounded-md text-white font-bold hover:bg-green-500 hover:text-green-100 outline outline-offset-0'
    const buttonStylesYellow = 'border-double py-1 px-1 w-10/12 bg-yellow-500 rounded-md text-white font-bold hover:bg-yelloe-300 hover:text-yellow-200 outline outline-offset-0'
    const dispatch = useDispatch()
    const handleAddToCart = async ( product ) => {
        dispatch( add( product ) );
        try {
            const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
            const token = localStorage.getItem( 'token' ).slice( 1, -1 )
            const res = await axios.post( `http://localhost:4000/api/fav/${ userId }/${ product._id }`, {}, {
                headers: {
                    authorization: `Bearer ${ token }`
                }
            } );
            if ( res.status === 201 ) {
                toast.success( `${ product.productName } is added to cart` );
            } else if ( res.data?.message === "Product is already chosen" ) {
                toast.success( `${ product.productName } is already in your cart` );
            }
        } catch ( err ) {
            console.log( "Error in adding cart", err );
            toast.error( err.response?.data?.error || 'Error in adding to cart' );
        }
    };
    const [ isPopupOpen, setPopupOpen ] = useState( false );
    const handlePopupClose = () => {
        setPopupOpen( false );
    };
    const handlePopupOpen = () => {
        setPopupOpen( true );
    };

    return (
        <div className='border border-gray-300 px-3 py-7 pt-5 relative rounded-lg hover:shadow-2xl' style={ { background: '#ffffff' } }>
            <span className='absolute top-2 right-2 text-lg cursor-pointer' onClick={ toggleHartColor }>{ }</span>
            <div className='relative'>
                <Link to={ `/products/${ product._id }` }>
                    <img className=' h-60 w-60 p-1 m-auto hover:cursor-pointer' src={ product.productImageUri } alt='product 1' />
                </Link>
            </div>
            <div>
                <p className='text-sm'>{ product.productDescription }</p>
                <button className={ blockStyle }>{ product.productRating } ★</button>
                <div className='flex gap-3 mt-3 text-sm'>
                    <p className='text-black'>${ product.productNewPrice } USD</p>
                    <p className='strikethrough'>${ product.productOldPrice } USD</p>
                    <p className='text-green-600 font-semibold'>{ product.productDiscount }% off</p>
                </div>
                <div className='flex justify-between px-4 mt-2 gap-4'>
                    <button className={ buttonStylesYellow } onClick={ () => handleAddToCart( product ) }>Add to cart</button>
                    <button className={ buttonStylesGreen } onClick={ () => handlePopupOpen() }>Buy now</button>
                </div>
            </div>
            <BackToTop />
            <Popup isOpen={ isPopupOpen } onClose={ handlePopupClose } productId={ product._id } productName={ product.productName }>
                <div className='flex mt-4'>
                    <div className='w-1/2 grid items-center justify-center'>
                        <Link to={ `/products/${ product._id }` }>
                            <img className='w-48 h-48' src={ product.productImageUri } alt="prod" />
                        </Link>
                    </div>
                    <div>
                        <p className='mt-3 font-normal text-3xl'>{ product.productName }</p>
                        <p className='mt-3 font-normal text-sm'>{ product.productDescription }</p>
                        <p className='mt-3 font-normal text-xl'>$ { product.productNewPrice } USD</p>
                        <button className={ popBlockStyle }>{ product.productRating } ★</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Product;

