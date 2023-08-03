import React, { useState, useEffect } from 'react';
const BackToTop = () => {
    const [ backToTop, setBackToTop ] = useState( false );
    useEffect( () => {
        const handleScroll = () => {
            if ( window.scrollY > 100 ) {
                setBackToTop( true );
            } else {
                setBackToTop( false );
            }
        };
        window.addEventListener( 'scroll', handleScroll );
        return () => {
            window.removeEventListener( 'scroll', handleScroll );
        };
    }, [] );
    const scrollUp = () => {
        const scrollStep = -window.scrollY / ( 500 / 15 );
        const scrollInterval = setInterval( () => {
            if ( window.scrollY !== 0 ) {
                window.scrollBy( 0, scrollStep );
            } else {
                clearInterval( scrollInterval );
            }
        }, 15 );
    };
    return (
        <div>
            { backToTop && (
                <button className='w-12 text-2xl h-12 border-2 border-gray-300 fixed bottom-12 right-12 bg-white rounded-lg scroll-smooth' onClick={ scrollUp }>
                    <p className='text-gray-400 px-3 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 2.75 } stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                        </svg>
                    </p>
                </button>
            ) }
        </div>
    );
};

export default BackToTop;
