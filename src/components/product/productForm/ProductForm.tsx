import { ChangeEvent, FormEvent } from "react";
import { Id } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ProductForm.scss';
import Card from '../../card/Card';

interface IProps {
    product: {
        name: string;
        category: string;
        price: string | number;
        quantity: string | number;
        description?: string,
        sku?: string,
        image?: {
            fileName: string,
            filePath: string,
            fileSize: string,
            fileType: string
        },
        _id?: Object,
        createdAt?: string,
        updatedAt?: string
    } | null,
    productImage: File | undefined,
    imagePreview: string | null,
    description: string,
    changeProduct: (event: ChangeEvent<HTMLInputElement>) => void,
    setDescription: React.Dispatch<React.SetStateAction<string>>
    changeProductImage: (event: ChangeEvent<HTMLInputElement>) => void,
    saveProduct: (event: FormEvent<HTMLFormElement>) => Id | undefined
}

function ProductForm({product, productImage, imagePreview, description, changeProduct, setDescription, changeProductImage, saveProduct}: IProps) {
    return (  
        <div className="add-product">
            <Card cardClass="card">
                <form onSubmit={saveProduct}>
                    <Card cardClass="group">
                        <label>Product image:</label>
                        <code className="--color-dark">Supported formats: jpg, jpeg, png</code>
                        <input type="file" name="image" onChange={(e) => changeProductImage(e)}/>
                        {imagePreview !== null ? (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Product image" />
                            </div>
                            ) : (
                            <p>No image set for this product</p>
                            )}
                    </Card>
                    <label>Product name:</label>
                    <input type="text" name="name" value={product?.name} onChange={changeProduct}/>
                    
                    <label>Product category:</label>
                    <input type="text" name="category" value={product?.category} onChange={changeProduct}/>

                    <label>Product price:</label>
                    <input type="number" name="price" value={product?.price} onChange={changeProduct}/>

                    <label>Product quantity:</label>
                    <input type="number" name="quantity" value={product?.quantity} onChange={changeProduct}/>

                    <label>Product description</label>
                    <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats}/>;

                    <div className="--my">
                        <button className="--btn --btn-primary" type="submit">Save product</button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

ProductForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };

  ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];

export default ProductForm;