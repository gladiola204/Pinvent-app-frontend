import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProductData } from "../../../types/productTypes";


export interface IFilterState {
    filteredProducts: []
}

const initialState: IFilterState = {
    filteredProducts: [],
    
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {
            const { products, search } = action.payload;
            const tempProducts = products.filter((product: IProductData) => product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()));

            state.filteredProducts = tempProducts;
        }
    }
})

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;

export default filterSlice.reducer;