import { useEffect } from 'react';
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { RootState } from "../../redux/store";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from '../../redux/features/product/productSlice';
import { useAppDispatch } from '../../customHook/useAppDispatch';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';

function Dashboard() {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, errorMessage } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        if(isLoggedIn === true) {
            dispatch(getProducts());
        };

        if(isError) {
            console.log(errorMessage);
        }
    }, [isError, errorMessage, dispatch, isLoggedIn])

    return (  
        <div>
            <ProductSummary products={products}/>
            <ProductList products={products} isLoading={isLoading}/>
        </div>
    );
}

export default Dashboard;