import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartFromAPI = createAsyncThunk( 'cart/fetchCart', async ( _, thunkAPI ) => {
  try {
    const userId = localStorage.getItem( 'userId' ).slice( 1, -1 );
    const token = localStorage.getItem( 'token' ).slice( 1, -1 )
    const res = await axios.get( `http://localhost:4000/api/fav/${ userId }`, {
      headers: {
        authorization: `Bearer ${ token }`
      }
    } );
    return res.data;
  } catch ( error ) {
    return thunkAPI.rejectWithValue( error.response?.data?.error || 'An error occurred' );
  }
} );

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: [],
  reducers: {
    add: ( state, action ) => {
      const productToAdd = action.payload;
      const existingProduct = state.find( ( item ) => item._id === productToAdd._id );
      if ( !existingProduct ) {
        state.push( productToAdd );
      }
    },
    remove: ( state, action ) => {
      return state.filter( ( item ) => item._id !== action.payload );
    },
    removeAll: () => {
      return [];
    }
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchCartFromAPI.fulfilled, ( state, action ) => {
        return action.payload;
      } )
      .addCase( fetchCartFromAPI.rejected, ( state, action ) => {
        console.error( action.payload );
      } )
  },
} );

export const { add, remove, removeAll } = cartSlice.actions;
export const selectCart = ( state ) => state.cart;
export default cartSlice.reducer;
