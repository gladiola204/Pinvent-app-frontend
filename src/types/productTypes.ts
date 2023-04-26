export interface IProductData {
    name: string,
    sku: string,
    category: string,
    quantity: string,
    price: string,
    description: string,
    image?: {
        fileName: string,
        filePath: string,
        fileSize: string,
        fileType: string
    },
    _id: Object,
    createdAt: string,
    updatedAt: string
}

