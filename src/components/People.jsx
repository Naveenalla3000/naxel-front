import React from 'react';
import Founder from '/Chris.jpg';
import Avather from '/avather.png'

const People = () => {
  const imgDivStyle = 'rounded-full w-56 h-56 border-4 border-gray-300 mx-auto mb-2 overflow-hidden hover:scale-110 transition-transform duration-1000 ease-in-out'
  return (
    <div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-auto border justify-around py-10'>
        <div className='grid items-center justify-center p-3 text-center'>
          <div className={ imgDivStyle }>
            <img className='w-full h-full' src={ Avather } alt='Founder' />
          </div>
          <div className='grid justify-center items-center'>
            <p className='font font-medium text-lg'>Naveen Alla</p>
            <p>Chief Technology Officer (CTO)</p>
          </div>
        </div>
        <div className='grid items-center justify-center p-3 text-center'>
          <div className={ imgDivStyle }>
            <img className='w-full h-full' src={ Avather } alt='Founder' />
          </div>
          <div className='grid justify-center items-center mt-3'>
            <p className='font font-medium text-lg'>Naveen Alla</p>
            <p>Chief Executive Officer (CEO)</p>
          </div>
        </div>
        <div className='grid items-center justify-center p-3 text-center'>
          <div className={ imgDivStyle }>
            <img className='w-full h-full' src={ Avather } alt='Founder' />
          </div>
          <div className='grid justify-center items-center mt-3'>
            <p className='font font-medium text-lg'>Naveen Alla</p>
            <p>Founder of Naxel</p>
          </div>
        </div>
        <div className='grid items-center justify-center p-3 text-center'>
          <div className={ imgDivStyle }>
            <img className='w-full h-full' src={ Avather } alt='Founder' />
          </div>
          <div className='grid justify-center items-center mt-3'>
            <p className='font font-medium text-lg'>Naveen Alla</p>
            <p>Chief Human Resources Officer (CHRO)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
