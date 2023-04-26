import { ChangeEvent, FormEvent, useState } from "react";
import ProductForm from "../../../components/product/productForm/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, selectIsLoading } from "../../../redux/features/product/productSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../customHook/useAppDispatch";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";

const initialState = {
    name: '',
    category: '',
    price: 0,
    quantity: 0,
}

function AddProduct() {
    useRedirectLoggedOutUser('/login');
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, category, price, quantity } = product;

    const changeProduct = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProduct({ ...product, [name]: value});
    };

    const changeProductImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files !== null) {
            setProductImage(event.target.files[0]);
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    const generateSKU = (category: string) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    };

    const saveProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!name || !category || !price || !quantity) {
            return toast.error("Please fill in all required fields")
        };

        const formData = new FormData(); // Nie można stworzyć zwykłego obiektu, bo on nie przyjmie image'u
        formData.append("name", name);
        formData.append("sku", generateSKU(category));
        formData.append("category", category);
        formData.append("price", price.toString());
        formData.append("quantity", quantity.toString());
        formData.append("description", description);
        formData.append("image", productImage as Blob);

        dispatch(createProduct(formData));

        navigate('/dashboard');
    }

    return (  
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Add new product</h3>
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

export default AddProduct;