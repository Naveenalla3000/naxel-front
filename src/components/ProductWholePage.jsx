import React, { useEffect, useState } from 'react';
import { add } from '../features/CartSlice.js'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FadeLoader } from 'react-spinners';
import axios from 'axios';
import Popup from './PopUp.jsx';
import BackToTop from './BackToTop.jsx';
import Footer from './Footer.jsx';

const ProductWholePage = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const [ product, setProduct ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const popBlockStyle = 'block bg-green-600 text-white text-base mt-3 px-2 rounded-sm w-fit'
    const [ isPopupOpen, setPopupOpen ] = useState( false );
    const handleAddoCart = async ( product ) => {
        dispatch( add( product ) );
        try {
            const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
            const token = localStorage.getItem( 'token' ).slice( 1, -1 )
            const res = await axios.post( `https://naxel-back.onrender.com/api/fav/${ userId }/${ product._id }`, {}, {
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
    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem( 'token' ).slice( 1, -1 );
                const res = await axios.get( `https://naxel-back.onrender.com/api/products/${ _id }`, {
                    headers: {
                        authorization: `Bearer ${ token }`,
                    },
                } );
                if ( res.statusText === 'OK' ) {
                    setProduct( res?.data );
                }
            } catch ( err ) {
                console.error( 'Error fetching products:', err );
                toast.error( err.response?.data?.error || 'An error occurred' );
            } finally {
                setLoading( false );
            }
        };
        fetchProducts();
    }, [ _id ] );
    const handlePopupClose = () => {
        setPopupOpen( false );
    };
    const handlePopupOpen = () => {
        setPopupOpen( true );
    };
    if ( loading ) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-blue-100" style={ { background: "#ffffff" } }>
                <FadeLoader color="#3B82F6" />
            </div>
        );
    }
    return (
        <div>
            <div className='flex w-full h-100vh p-4' style={ { background: '#ffffff' } }>
                <div className='w-1/2 flex items-center justify-center drop-shadow-xl'>
                    <div className='bg-white w-max max-h-full p-2 rounded-md border-double border-2 border-gray-300'>
                        <img className='w-96 h-96' src={ product.productImageUri } alt='product' />
                    </div>
                </div>
                <div className='w-1/2 py-10 px-5'>
                    <p className='text-3xl font-semibold my-5'>{ product.productName } </p>
                    <div className='px-10'>
                        <div>
                            <p>
                                { product.productDescription }
                            </p>
                            <div className='my-8'>
                                <div className='flex text-lg'>
                                    <p className='mr-5'>$ { product.productNewPrice } USD</p>
                                    <p className='mr-5 strikethrough'>$ { product.productOldPrice } USD </p>
                                    <p> { product.productDiscount }% Off</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-96 h-40 flex bg-white my-4 items-center justify-center rounded-lg drop-shadow-xl border-double border-4 border-gray-500'>
                            <p className='m-auto text-8xl text-green-600 cursor-pointer'>★</p>
                            <div className='m-auto border-0 border-red-500'>
                                <div className='border-8 h-24 w-24 m-auto rounded-full border-blue-400 flex items-center justify-center cursor-pointer'>
                                    <p className='text-5xl font-bold'>1</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between px-2 mt-10 w-96'>
                            <button className='bg-yellow-500 px-2 py-2 rounded-lg text-white text-xl font-semibold border-2 border-white'
                                onClick={ () => handleAddoCart( product ) }
                            >Add to cart</button>
                            <button className='bg-green-500 px-2 py-2 rounded-lg text-white text-xl font-semibold border-2 border-white'
                                onClick={ () => handlePopupOpen() }>Buy Now</button>
                        </div>
                    </div>
                </div>
                <BackToTop />
                <Popup isOpen={ isPopupOpen } onClose={ handlePopupClose } productId={ _id } productName={ product.productName }>
                    <div className='flex mt-4'>
                        <div className='w-1/2 grid items-center justify-center'>
                            <img className='w-48 h-48' src={ product.productImageUri } alt="prod" onClick={ handlePopupClose } />
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
            <Footer />
        </div>
    );
};
export default ProductWholePage;