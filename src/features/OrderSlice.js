import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrdersFromAPI = createAsyncThunk( 'orders/fetchOrders', async ( _, thunkAPI ) => {
    try {
        const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
        const token = localStorage.getItem( 'token' ).slice( 1, -1 )
        const res = await axios.get( `https://naxel-back.onrender.com/api/orders/${ userId }`, {
            headers: {
                authorization: `Bearer ${ token }`
            }
        } );
        return res.data;
    } catch ( error ) {
        return thunkAPI.rejectWithValue( error.response?.data?.error || 'An error occurred' );
    }
} );
export const orderSlice = createSlice( {
    name: 'order',
    initialState: [],
    reducers: {
        add: ( state, action ) => {
            state.push( action.payload );
        },
        removeAllOrders: () => {
            return [];
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( fetchOrdersFromAPI.fulfilled, ( state, action ) => {
                return action.payload;
            } )
            .addCase( fetchOrdersFromAPI.rejected, ( state, action ) => {
                console.error( action.payload );
            } )
    },
} );

export const { add, removeAllOrders } = orderSlice.actions;
export const selectOrder = ( state ) => state.order;
export default orderSlice.reducer;
