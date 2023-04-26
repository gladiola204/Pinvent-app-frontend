import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../store';
import { IUser } from "../../../types/userTypes";

const name = localStorage.getItem('name');

export interface IAuthState {
    isLoggedIn: boolean,
    name: string,
    user: IUser,
}


const initialState: IAuthState = {
    isLoggedIn: false,
    name: name ? name : '',
    user: {
        name: '',
        email: '',
        phone: '',
        bio: '',
        photo: '',
    },
};

interface setLoginActionType {
    payload: boolean,
    type: string,
}

interface setNameActionType {
    payload: string,
    type: string,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_LOGIN(state, action: setLoginActionType) {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action: setNameActionType) {
            localStorage.setItem("name", action.payload);
            state.name = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.bio = profile.bio;
            state.user.photo = profile.photo;
        }
    },
});

export const {SET_LOGIN, SET_NAME, SET_USER} = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectName = (state: RootState) => state.auth.name;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
