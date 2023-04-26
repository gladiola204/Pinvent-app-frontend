import { configureStore } from "@reduxjs/toolkit";
import authReducer, { IAuthState } from '../redux/features/auth/authSlice';
import productReducer, { IProductState } from './features/product/productSlice';
import filterReducer, { IFilterState } from './features/product/filterSlice';


export interface RootState {
    auth: IAuthState,
    product: IProductState,
    filter: IFilterState,
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer
    }
});

export type AppDispatch = typeof store.dispatch;