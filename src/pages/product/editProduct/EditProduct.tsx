import { useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useAppDispatch } from "../../../customHook/useAppDispatch";
import { useSelector } from "react-redux";
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from "../../../redux/features/product/productSlice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import ProductForm from "../../../components/product/productForm/ProductForm";

function EditProduct() {
    useRedirectLoggedOutUser('/login');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
    const productEdit = useSelector(selectProduct);
    const { id } = useParams();
    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');

    const changeProduct = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if(product) setProduct({ ...product, [name]: `${value}`});
    };

    const changeProductImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files !== null) {
            setProductImage(event.target.files[0]);
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    const saveProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(product !== null && id) {
            if(!product.name || !product.category || !product.price || !product.quantity) {
                return toast.error("Please fill in all required fields")
            };
            const formData = new FormData(); // Nie można stworzyć zwykłego obiektu, bo on nie przyjmie image'u
            formData.append("name", product.name);
            formData.append("category", product.category);
            formData.append("price", product.price.toString());
            formData.append("quantity", product.quantity.toString());
            formData.append("description", description);
            if(productImage) formData.append("image", productImage as Blob);
    
            dispatch(updateProduct({id, formData}));
            dispatch(getProducts());
            navigate('/dashboard');
        }
    }

    useEffect(() => {
        if (id) dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);

        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        );

        setDescription(
            productEdit && productEdit.description ? productEdit.description : ''
        );

    }, [productEdit]);

    return (  
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Edit product</h3>
            <ProductForm 
                product={product} 
                productImage={productImage} 
                imagePreview={imagePreview}
                description={description}
                changeProduct={changeProduct}
                setDescription={setDescription}
                changeProductImage={changeProductImage}
                saveProduct={saveProduct}
                />
        </div>
    );
}

export default EditProduct;