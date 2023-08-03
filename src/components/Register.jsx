import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { login } from '../features/UserSlice.js'
const Register = () => {
  const dispatch = useDispatch()
  const [ userFirstName, setUserFirstName ] = useState( '' );
  const [ userLastName, setUserLastName ] = useState( '' );
  const [ userPassword, setUserPassword ] = useState( '' );
  const [ userConfirmPassword, setUserConfirmPassword ] = useState( '' );
  const [ userPhoneNumber, setUserPhoneNumber ] = useState( '' );
  const [ userEmail, setUserEmail ] = useState( '' );
  const [ userGender, setUserGender ] = useState( '' );
  const [ passwordType, setPasswordType ] = useState( "password" );
  const [ confirmPasswordType, setConfirmPasswordType ] = useState( "password" );
  const togglePassword = () => {
    if ( passwordType === "password" ) {
      setPasswordType( "text" )
      return;
    }
    setPasswordType( "password" )
  }
  const toggleConfirmPassword = () => {
    if ( confirmPasswordType === "password" ) {
      setConfirmPasswordType( "text" )
      return;
    }
    setConfirmPasswordType( "password" )
  }
  const resetFields = () => {
    setUserFirstName( '' )
    setUserLastName( '' )
    setUserPassword( '' )
    setUserConfirmPassword( '' )
    setUserEmail( '' )
    setUserPhoneNumber( '' )
    setUserGender( '' )
  }
  const handleRegister = async ( e ) => {
    e.preventDefault()
    try {
      const res = await axios.post( 'https://naxel-back.onrender.com/api/users/register',
        { userFirstName, userLastName, userPassword, userConfirmPassword, userPhoneNumber, userEmail, userGender, } )
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
        toast.success( `${ userEmail } registered successfully` )
      } else {
        throw new Error( "An Error occurred" )
      }
    }
    catch ( err ) {
      toast.error( err.response?.data?.error || 'An error occurred' );
      console.log( err )
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center' style={ { background: "#FFFFFF" } }>
      <div className='md:w-2/5 bg-white items-center py-5 px-10 rounded-xl w-5/6 border-gray-300 border-2 drop-shadow-xl'>
        <h1 className='text-3xl font-extralight text-left my-4'>Register</h1>
        <form>
          <div className='flex gap-4'>
            <input
              type="text"
              className='m-auto w-1/2 border-gray-400 border-2 outline-none p-1 my-4 rounded-md'
              placeholder='Enter your first name'
              value={ userFirstName }
              onChange={ ( e ) => setUserFirstName( e.target.value ) }
              required
            />
            <p className='text-red-600 hidden'>* User first Name required</p>
            <input
              type="text"
              className='m-auto w-1/2 border-gray-400 border-2 outline-none p-1 my-4 rounded-md'
              placeholder='Enter your last name'
              value={ userLastName }
              onChange={ ( e ) => setUserLastName( e.target.value ) }
              required
            />
            <p className='text-red-600 hidden'>* User last Name required</p>
          </div>
          <input
            type="email"
            className='m-auto w-full border-gray-400 border-2 outline-none p-1 my-4 rounded-md'
            placeholder='Enter your email'
            value={ userEmail }
            onChange={ ( e ) => setUserEmail( e.target.value ) }
            required
          />
          <p className='text-red-600 hidden'>* UserName email</p>
          <div className='flex gap-4'>
            <input
              type='text'
              className='m-auto border-gray-400 border-2 outline-none p-1 my-4 rounded-md w-1/2'
              placeholder='Enter your phone'
              value={ userPhoneNumber ? `+91${ userPhoneNumber }` : '' }
              onChange={ ( e ) => setUserPhoneNumber( e.target.value.replace( /\D/g, '' ) && e.target.value.replace( /^(\+91)/, '' ) ) }
              required
              maxLength={ 13 }
            />
            <select className={ `w-1/2 border-gray-400 border-2 outline-none m-auto p-1 my-4 rounded-md ${ userGender ? 'text-black' : 'text-gray-500' }` } value={ userGender }
              onChange={ ( e ) => setUserGender( e.target.value ) }>
              <option disabled value=''>Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Rather not to say'>Rather not to say</option>
            </select>
          </div>
          <p className='text-red-600 hidden'>* user phome number required</p>
          <div className='relative'>
            <input
              type={ passwordType }
              className='w-full border-gray-400 border-2 my-4 outline-none p-1 rounded-md select-none'
              placeholder='Enter your password'
              value={ userPassword }
              onChange={ ( e ) => setUserPassword( e.target.value ) && handlePhoneNumberChange }
              required
              autoComplete='true'
            />
            <div onClick={ togglePassword } className='absolute top-1/3 right-2 cursor-pointer'>
              { passwordType === 'password' ? '👁️' : '👁️‍🗨️' }
            </div>
          </div>
          <p className='text-red-600 hidden'>* password required</p>
          <div className='relative'>
            <input
              type={ confirmPasswordType }
              className='w-full border-gray-400 border-2 my-4 outline-none p-1 rounded-md select-none'
              placeholder='Confirm password'
              value={ userConfirmPassword }
              onChange={ ( e ) => setUserConfirmPassword( e.target.value ) }
              required
              autoComplete='true'
            />
            <div onClick={ toggleConfirmPassword } className='absolute top-1/3 right-2 cursor-pointer'>
              { confirmPasswordType === 'password' ? '👁️' : '👁️‍🗨️' }
            </div>
          </div>
          <p className='text-red-600 hidden'>* password required</p>
          <div className='flex justify-between my-4 gap-4'>
            <button className='bg-blue-500 p-1 rounded-md text-white w-3/4 text-lg' onClick={ ( e ) => handleRegister( e ) }>Register</button>
            <button onClick={ () => resetFields() } className='bg-blue-500 p-1 rounded-md text-white w-1/4 text-lg'>Cancel</button>
          </div>
        </form>
        <p className='text-center'>Already a customer? <Link to={ '/login' }>login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
