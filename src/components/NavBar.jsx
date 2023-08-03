import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../features/UserSlice.js'
import { logout } from '../features/UserSlice.js'
import { toast } from 'react-toastify'
import { removeAll } from '../features/CartSlice.js'
import { removeAllOrders } from '../features/OrderSlice.js'

const NavBar = () => {
    const listItemStyle = 'p-1 mr-6 cursor-pointer hover:text-blue-800 text-xl border-b-2 hover:border-blue-600 duration-300 ease-in-out border-black border-gray-900';
    const user = useSelector( selectUser );
    const [ navPos, setNavPos ] = useState( '' );
    const [ scrollY, setScrollY ] = useState( 0 );
    useEffect( () => {
        const handleScroll = () => {
            const currentScrollY = document.documentElement.scrollTop;
            if ( currentScrollY > scrollY ) {
                setNavPos( 'hidden' );
            } else {
                setNavPos( '' );
            }
            setScrollY( currentScrollY );
        };

        window.addEventListener( 'scroll', handleScroll );
        return () => {
            window.removeEventListener( 'scroll', handleScroll );
        };
    }, [ scrollY ] );
    const dispatch = useDispatch()
    const handleLogout = ( e ) => {
        e.preventDefault()
        dispatch( logout() )
        dispatch( removeAll() )
        dispatch( removeAllOrders() )
        localStorage.removeItem( 'userName' )
        toast.success( "logged out" )
    }
    return (
        <div
            className={ `md:px-4 md:py-3 ${ navPos } flex px-10 py-3 items-center justify-between w-full sticky top-0 z-10 text-black border-custom-gray border bg-gray-900` }
        >
            <div className='text-3xl text-white font-bold hover:text-blue-800 cursor-pointer w-fit'>
                <Link to={ '/' }>Nexel.com</Link>
            </div>
            <ul className='hidden md:flex mb-0 md:mb-0 text-white text-lg font-semibold'>
                <li className={ listItemStyle }>
                    <Link to={ '/' }>Home</Link>
                </li>
                <li className={ listItemStyle }>
                    <Link to={ '/products' }>Products</Link>
                </li>
                <li className={ listItemStyle }>
                    <Link to={ '/cart' }>Cart</Link>
                </li>
                <li className={ listItemStyle }>
                    <Link to={ '/orders' }>My Orders</Link>
                </li>
            </ul>
            <ul className='flex text-white font-semibold text-lg'>
                <li className={ listItemStyle }>
                    {
                        user ? <Link to={ '/profile' }>Profile</Link> : <Link to={ '/login' }>Login</Link>
                    }
                </li>
                <li className={ listItemStyle }>
                    {
                        user ? <button onClick={ ( e ) => handleLogout( e ) }>Logout</button> : <Link to={ '/register' }>register</Link>
                    }
                </li>
            </ul>
        </div>
    )
}

export default NavBar