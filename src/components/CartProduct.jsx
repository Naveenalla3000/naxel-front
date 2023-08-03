import React, { useState } from 'react';
import BackToTop from './BackToTop';
import { remove } from '../features/CartSlice.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import Popup from './PopUp.jsx';

const CartProduct = ( { product } ) => {
    console.log( product )
    const [ heart, setHeart ] = useState( '🤍' );
    const blockStyle = 'block bg-green-600 text-white text-base mt-3 px-2 rounded-sm';
    const buttonStylesGreen =
        'border-double py-1 px-1 w-10/12 bg-green-500 rounded-md text-white font-bold hover:bg-green-600 hover:text-green-100 outline outline-offset-0';
    const buttonStylesRed =
        'border-double py-1 px-1 w-10/12 bg-red-500 rounded-md text-white font-bold hover:bg-red-600 hover:text-green-100 outline outline-offset-0';
    const popBlockStyle =
        'block bg-green-600 text-white text-base mt-3 px-2 rounded-sm w-fit'

    const toggleHartColor = () => {
        if ( heart === '🤍' ) {
            setHeart( '❤️' );
            return;
        }
        setHeart( '🤍' );
    };
    const dispatch = useDispatch()
    const handleRemoveFromCart = async ( e ) => {
        e.preventDefault();
        dispatch( remove( product._id ) )
        try {
            const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
            const token = localStorage.getItem( 'token' ).slice( 1, -1 )
            const res = await axios.delete( `http://localhost:4000/api/fav/${ userId }/${ product._id }`,
                {
                    headers: {
                        authorization: `Bearer ${ token }`
                    }
                } );
            if ( res.status === 200 ) {
                toast.success( `${ product.productName } is removed from cart` )
            }
        }
        catch ( err ) {
            toast.error( err.response?.data?.error || 'An error occurred' );
        }
    }
    const [ isPopupOpen, setPopupOpen ] = useState( false );
    const handlePopupClose = () => {
        setPopupOpen( false );
    };
    const handlePopupOpen = () => {
        setPopupOpen( true );
    };
    return (
        <div className='border border-gray-300 px-3 py-7 pt-5 relative bg-white rounded-lg hover:shadow-2xl'>
            <span className='absolute top-2 right-2 text-lg cursor-pointer' onClick={ toggleHartColor }>
                { }
            </span>
            <div className='relative'>
                <Link to={ `/products/${ product.product }` }>
                    <img className='h-60 w-60 p-1 m-auto hover:cursor-pointer' src={ product.productImageUri } alt='product 1' />
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
                    <button className={ buttonStylesRed } onClick={ ( e ) => handleRemoveFromCart( e ) }>Remove</button>
                    <button className={ buttonStylesGreen } onClick={ () => handlePopupOpen() }>Buy now</button>
                </div>
            </div>
            <BackToTop />
            <Popup isOpen={ isPopupOpen } onClose={ handlePopupClose } productId={ product.product } productName={ product.productName }>
                <div className='flex mt-4'>
                    <div className='w-1/2 grid items-center justify-center'>
                        <Link to={ `/products/${ product.product }` }>
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
    );
};

export default CartProduct;
