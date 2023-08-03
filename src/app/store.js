import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/UserSlice.js'
import cartReducer from '../features/CartSlice.js'
import orderReducer from '../features/OrderSlice.js'

export default configureStore( {
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer
    },
} );

