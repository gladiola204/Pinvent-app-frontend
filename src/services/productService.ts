import request from "./axios/axios";

const API_URL = `/api/products/`;

async function createNewProduct(productData:FormData) {
    const response = await request.post(API_URL, productData);
    return response.data;
};

async function getAllProducts() {
    const response = await request.get(API_URL);
    return response.data;
};

async function deleteProduct(id: string) {
    const response = await request.delete(API_URL + id);
    return response.data;
};

async function getProduct(id: string) {
    const response = await request.get(API_URL + id);
    return response.data;
};

async function updateProduct(id: string, formData: FormData) {
    const response = await request.patch(API_URL + id, formData);
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