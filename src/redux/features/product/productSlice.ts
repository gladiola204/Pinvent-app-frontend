import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../../services/productService";
import { toast } from "react-toastify";
import { IProductData } from "../../../types/productTypes";
import { RootState } from "../../store";



export interface IProductState {
    product: null | IProductData,
    products: IProductData[],
    isError: boolean,
    errorMessage: any, // NAPRAWIĆ
    isSuccess: boolean,
    isLoading: boolean,
    totalStoreValue: number,
    outOfStock: number,
    category: number,
}

const initialState: IProductState = {
    product: null,
    products: [],
    isError: false,
    errorMessage: '',
    isSuccess: false,
    isLoading: false,
    totalStoreValue: 0,
    outOfStock: 0,
    category: 0,
};

export const createProduct = createAsyncThunk(
    "products/create",
    async (productData: FormData, thunkAPI) => {
        try {
            return await productService.createNewProduct(productData)
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts();
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id: string, thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id: string, thunkAPI) => {
        try {
            return await productService.getProduct(id);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({id, formData}: {id: string, formData: FormData}, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData);
        } catch (error: any) {
            const message = 
            ( error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action: {payload: IProductData[]}) {
            const products = action.payload;
            let summary = 0;
            console.log(products);
            products.map((product) => {
                const { price, quantity } = product;
                const productValue = Number(price) * Number(quantity);
                summary += productValue;
                return;
            });
            state.totalStoreValue = summary;
        },
        CALC_OUT_OF_STOCK(state, action: {payload: IProductData[]}) {
            const products = action.payload;
            let outOfStock = 0;
            products.map((product) => {
                const { quantity } = product;
                if(Number(quantity) === 0) {
                    outOfStock += 1
                    return;
                }
                return;
            });
            state.outOfStock = outOfStock;
        },
        CALC_CATEGORIES(state, action: {payload: IProductData[]}) {
            const products = action.payload;
            const arrayOfAllCategories: string[] = [];
            products.map((product) => {
                const { category } = product;
                return arrayOfAllCategories.push(category);
            });
            const uniqueCategories = [...new Set(arrayOfAllCategories)];
            state.category = uniqueCategories.length;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products.push(action.payload);
                toast.success('Product added succesfully');
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.errorMessage = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.errorMessage = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product deleted succesfully")
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.errorMessage = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.errorMessage = action.payload;
                toast.error(`${action.payload}`);
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Product updated succesfully')
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.errorMessage = action.payload;
                toast.error(`${action.payload}`);
            })
    }
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORIES } = productSlice.actions;

export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectProduct = (state: RootState) => state.product.product;
export const selectTotalStoreValue = (state: RootState) => state.product.totalStoreValue;
export const selectOutOfStock = (state: RootState) => state.product.outOfStock;
export const selectCategory = (state: RootState) => state.product.category;

export default productSlice.reducer;