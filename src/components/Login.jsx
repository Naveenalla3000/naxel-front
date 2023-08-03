import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from '../features/UserSlice.js';
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [ userEmail, setUserEmail ] = useState( '' );
  const [ userPassword, setUserPassword ] = useState( '' );
  const [ passwordType, setPasswordType ] = useState( "password" );
  const togglePassword = () => {
    if ( passwordType === "password" ) {
      setPasswordType( "text" )
      return;
    }
    else {
      setPasswordType( "password" )
      return;
    }
  };
  const dispatch = useDispatch()
  const handleSubmit = async ( e ) => {
    if ( !userEmail ) alert( "Email Should Be filled" )
    if ( !userPassword ) alert( "Password shoild Be filled" )
    e.preventDefault();
    try {
      const res = await axios.post( 'https://naxel-back.onrender.com/api/users/login', { userEmail, userPassword } );
      if ( res.status === 200 ) {
        console.log( res.data );
        const token = await res.data?.token;
        const userId = res.data?.user?._id;
        localStorage.setItem( 'userId', JSON.stringify( userId ) )
        localStorage.setItem( 'token', JSON.stringify( token ) );
        dispatch( login( {
          userEmail: userEmail,
          userPassword: userPassword,
          token: JSON.stringify( token ),
          loggedIn: true,
        } ) );
        setUserEmail( '' );
        setUserPassword( '' );
        toast.success( `${ userEmail } loggedIn` )
      }
    } catch ( err ) {
      toast.error( err.response?.data?.error || 'An error occurred' );
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center' style={ { background: "#ffffff" } }>
      <div className='md:w-2/5 bg-white items-center py-5 px-10 rounded-xl w-5/6 border-gray-300 border-2 drop-shadow-xl'>
        <h1 className='text-3xl font-extralight text-left my-4'>Login</h1>
        <form onSubmit={ ( e ) => handleSubmit( e ) }>
          <input
            type="text"
            className='m-auto w-full border-gray-400 border-2 outline-none p-1 my-4 rounded-md'
            placeholder='Enter your email'
            value={ userEmail }
            onChange={ ( e ) => setUserEmail( e.target.value ) }
            required
          />
          <p className='text-red-600 hidden'>* UserName required</p>
          <div className='relative'>
            <input
              type={ passwordType }
              className='w-full border-gray-400 border-2 my-4 outline-none p-1 rounded-md'
              placeholder='Enter your password'
              value={ userPassword }
              onChange={ ( e ) => setUserPassword( e.target.value ) }
              required
              autoComplete='true'
            />
            <div onClick={ togglePassword } className='absolute top-1/3 right-2 cursor-pointer'>
              { passwordType === 'password' ? '👁️' : '👁️‍🗨️' }
            </div>
          </div>
          <p className='text-red-600 hidden'>* UserName required</p>
          <button type='submit' className='m-auto bg-blue-500 p-1 text-white my-4 w-full rounded-md block text-lg'>Login</button>
        </form>
        <p className='text-center'>Don't you have an account? <Link to={ '/register' }>register here</Link></p>
      </div>
    </div>
  );
};
export default Login;
