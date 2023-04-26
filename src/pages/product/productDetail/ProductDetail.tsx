import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../customHook/useAppDispatch';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import './ProductDetail.scss';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect } from 'react';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../../components/card/Card';
import { SpinnerImg } from '../../../components/loader/Loader';
import DOMPurify from 'dompurify';

function ProductDetail() {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, errorMessage } = useSelector((state: RootState) => state.product);

    const stockStatus = (quantity: string) => {
        if(Number(quantity) > 0) {
            return <span className='--color-success'>In Stock</span>
        }
        return <span className='--color-danger'>Out of Stock</span>
    }

    useEffect(() => {
        if(isLoggedIn === true && id) {
            dispatch(getProduct(id));
        };

        if(isError) {
            console.log(errorMessage);
        }
    }, [isError, errorMessage, dispatch, isLoggedIn])

    return (  
        <div className='product-detail'>
            <h3 className="--mt">Product detail</h3>
            <Card cardClass='card'>
                <>
                    {isLoading && <SpinnerImg />}
                    {product && (
                        <div className="detail">
                            <Card cardClass='group'>
                                <>
                                    {product.image ? (
                                        <img src={product.image.filePath} alt={product.image.fileName} />
                                    ) : (
                                        <p>No image set for this product</p>
                                    )}
                                </>
                            </Card>

                            <h4>Product availability: {stockStatus(product.quantity)}</h4>
                            <hr /> 
                            <h4>
                                <span className="badge">Name: </span> &nbsp; {product.name}
                            </h4>
                            <p>
                                <b>&rarr; SKU: </b>{product.sku}
                            </p>
                            <p>
                                <b>&rarr; Category: </b> {product.category}
                            </p>
                            <p>
                                <b>&rarr; Quantity: </b> {product.quantity}
                            </p>
                            <p>
                                <b>&rarr; Total Value: </b> ${Number(product.quantity) * Number(product.price)}
                            </p>
                            <hr />
                            <div dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description)
                            }}>
                            </div>
                            <hr />
                            <code className='--color-dark'>Created on: {product.createdAt}</code>
                            <br />
                            <code className='--color-dark'>Last updated: {product.updatedAt}</code>
                        </div>
                    )}
                </>
            </Card>
        </div>
    );
}

export default ProductDetail;