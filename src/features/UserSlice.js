import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem( 'token' ) ? JSON.parse( localStorage.getItem( 'token' ) ) : null,
};

export const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        login: ( state, action ) => {
            state.user = action.payload;
            if ( !state.user ) return;
            console.log( 'login', action );
        },
        logout: ( state ) => {
            localStorage.removeItem( 'token' );
            localStorage.removeItem( 'userId' );
            state.user = null;
        },
    },
} );

export const { login, logout } = userSlice.actions;
export const selectUser = ( state ) => state.user.user;
export default userSlice.reducer;
