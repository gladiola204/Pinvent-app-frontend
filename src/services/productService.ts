import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;



async function createNewProduct(productData:FormData) {
    const response = await axios.post(API_URL, productData);
    return response.data;
};

async function getAllProducts() {
    const response = await axios.get(API_URL);
    return response.data;
};

async function deleteProduct(id: string) {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

async function getProduct(id: string) {
    const response = await axios.get(API_URL + id);
    return response.data;
};

async function updateProduct(id: string, formData: FormData) {
    const response = await axios.patch(API_URL + id, formData);
    return response.data;
};

const productService = {
    createNewProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}

export default productService;