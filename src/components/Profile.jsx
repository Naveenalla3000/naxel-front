import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import Footer from './Footer';
const Profile = () => {
  const [ userFirstName, setUserFirstName ] = useState( '' );
  const [ userLastName, setUserLastName ] = useState( '' );
  const [ userEmail, setUserEmail ] = useState( '' );
  const [ userPhoneNumber, setUserNumber ] = useState( '' );
  const [ userGender, setUserGender ] = useState( '' );
  const [ userFirstNameFirstLetter, setUserFirstNameFirstLetter ] = useState( '' )
  const [ updateData, setUpdateData ] = useState( false )
  useEffect( () => {
    fetchProfileData();
  }, [] );
  const fetchProfileData = async () => {
    try {
      const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
      const token = localStorage.getItem( 'token' ).slice( 1, -1 )
      const res = await axios.get( `http://localhost:4000/api/users/${ userId }`, {
        headers: {
          authorization: `Bearer ${ token }`
        }
      } );
      const { userEmail, userFirstName, userGender, userLastName, userPhoneNumber } = res.data;
      setUserFirstName( userFirstName );
      setUserLastName( userLastName );
      setUserEmail( userEmail );
      setUserGender( userGender );
      setUserNumber( userPhoneNumber );
      setUserFirstNameFirstLetter( userFirstName[ 0 ].toUpperCase() )
    } catch ( err ) {
      console.log( err.message )
    }
  };
  const handleUpdate = async ( e ) => {
    e.preventDefault()
    if ( updateData ) {
      try {
        const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
        const token = localStorage.getItem( 'token' ).slice( 1, -1 )
        const res = await axios.patch( `http://localhost:4000/api/users/${ userId }`,
          { userFirstName, userLastName, userEmail, userPhoneNumber, userGender }, {
          headers: {
            authorization: `Bearer ${ token }`
          }
        } );
        if ( res.status === 200 ) {
          fetchProfileData()
        }
        toast.success( "User Data updated" )
        setUpdateData( false )
      }
      catch ( err ) {
        console.log( err.message )
        toast.error( err.message )
        setUpdateData( false )
      }
    } else {
      toast.error( "No change found" )
      setUpdateData( false )
    }
  }
  return (
    <div className="items-center justify-center w-full" style={ { background: "#FFFFFF" } }>
      <div className='h-screen p-4'>
        <div className="m-auto rounded-full h-36 w-36 border-4 border-white bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 text-center flex justify-center items-center font-bold text-white text-6xl shadow-lg cursor-pointer mt-10 hover:text-8xl duration-700">
          { userFirstNameFirstLetter }
        </div>
        <div className="m-auto w-full md:w-3/4 lg:w-1/2 border-2 border-gray-300 px-5 py-10 bg-white rounded-lg shadow-xl mt-10">
          <div className="text-left pb-4 font-light text-3xl">Profile</div>
          <form>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <input
                type="text"
                className="w-full md:w-1/2 border-gray-400 border-2 outline-none p-2 my-2 rounded-md text-gray-500"
                placeholder='First Name'
                required
                value={ userFirstName }
                onChange={ ( e ) => { setUserFirstName( e.target.value ); setUpdateData( true ); } }
              />
              <input
                type="text"
                className="w-full md:w-1/2 border-gray-400 border-2 outline-none p-2 my-2 rounded-md text-gray-500"
                placeholder="Last Name"
                required
                value={ userLastName }
                onChange={ ( e ) => { setUserLastName( e.target.value ); setUpdateData( true ); } }
              />
            </div>
            <input
              type="email"
              className="w-full border-gray-400 border-2 outline-none p-2 my-2 rounded-md mt-4 text-gray-500"
              placeholder="Email"
              required
              value={ userEmail }
              onChange={ ( e ) => { setUserEmail( e.target.value ); setUpdateData( true ) } }
            />
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <input
                type="text"
                className="w-full md:w-1/2 border-gray-400 border-2 outline-none p-2 my-2 rounded-md text-gray-500"
                placeholder="Phone Number"
                maxLength={ 13 }
                value={ userPhoneNumber ? `+91${ userPhoneNumber }` : '' }
                onChange={ ( e ) => { setUserNumber( e.target.value.replace( /\D/g, '' ) && e.target.value.replace( /^(\+91)/, '' ) ); setUpdateData( true ) } }
              />
              <select
                className="w-full md:w-1/2 border-gray-400 border-2 outline-none p-2 my-2 rounded-md text-gray-500"
                value={ userGender }
                onChange={ ( e ) => { setUserGender( e.target.value ); setUpdateData( true ) } }
              >
                <option disabled value="">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather not to say">Rather not to say</option>
              </select>
            </div>
            <button className={ "text-white font-semibold py-2 px-4 rounded-md w-full mt-4 " + ( updateData ? "bg-blue-600" : "bg-blue-300" ) }
              onClick={ ( e ) => { handleUpdate( e ) } }>
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div >
  );
};
export default Profile;