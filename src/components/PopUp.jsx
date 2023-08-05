import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const Popup = ( { isOpen, onClose, productId, productName, children, } ) => {
    const handleCloseClick = () => {
        onClose();
    };
    const handleOrder = async () => {
        try {
            const userId = localStorage.getItem( 'userId' ).slice( 1, -1 )
            const token = localStorage.getItem( 'token' ).slice( 1, -1 )
            const res = await axios.post( `https://naxel-back.onrender.com/api/orders/${ userId }/${ productId }`, { userId, productId }, {
                headers: {
                    authorization: `Bearer ${ token }`
                }
            } )
            if ( res.status === 200 || res.status === 201 ) {
                toast.success( ` ${ productName } Ordered successfully` );
                handleCloseClick()
            } else {
                toast.error( "Error in ordering" )
            }
        }
        catch ( err ) {
            console.log( "Error in adding cart", err );
            toast.error( err.response?.data?.error || 'Error in ordering to cart' );
        }
    }
    if ( !isOpen ) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="rounded-xl p-6 h-auto w-auto bg-white border-4 border-blue-200 relative" style={ { background: "#FFFFFF" } }>
                <button
                    className="absolute top-6 right-6 block p-0 border-2 font-semibold text-gray-400 w-8 h-8 text-xl rounded-full"
                    onClick={ () => handleCloseClick() }
                >X
                </button>
                { children }
                <div className='flex px-24 mt-11 justify-between'>
                    <div>
                        <button className='border-2 py-2 px-2 bg-white rounded-md text-black outline outline-offset-0'
                            onClick={ () => handleCloseClick() }
                        >cancel</button>
                    </div>
                    <div>
                        <button className='border-double py-2 px-2 bg-green-600 rounded-md text-white font-bold hover:bg-green-500 hover:text-green-100 outline outline-offset-0' onClick={ handleOrder }>Place order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Popup;
