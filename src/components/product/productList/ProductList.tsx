import { IProductData } from '../../../types/productTypes';
import { SpinnerImg } from '../../loader/Loader';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import './ProductList.scss';
import { ChangeEvent, useState, useEffect } from 'react';
import ProductSearch from '../productSearch/ProductSearch';
import { useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import { useAppDispatch } from '../../../customHook/useAppDispatch';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice';
import { Link } from 'react-router-dom';


function ProductList({ products, isLoading }: {products: IProductData[], isLoading: boolean}) {
    const [search, setSearch] = useState('');
    const filteredProducts = useSelector(selectFilteredProducts);
    const dispatch = useAppDispatch();

    const shortenText = (text: string, maxLength: number) => {
        if(text.length > maxLength) {
            const shortenedText = text.substring(0, maxLength).concat('...');
            return shortenedText;
        }
        return text;
    };

    const delProduct = async (id: string) => {
        await dispatch(deleteProduct(id));
        await dispatch(getProducts());
    };

    const confirmDelete = (id: string) => {
        confirmAlert({
            title: 'Delete product',
            message: 'Are you sure you want to delete this product?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancel',
                //onClick: () => alert('Click No')
              }
            ]
          });
    }

    // Begin pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
  
      setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredProducts]);
  
    const handlePageClick = (event: {selected: number}) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
      setItemOffset(newOffset);
    };
    // End pagination

    const eachProduct = currentItems.map((product, index) => {
        const {name, category, price, quantity, _id } = product
        return (
            <tr key={`${_id}`}>
                <td>{index + 1}</td>
                <td>{shortenText(name, 16)}</td>
                <td>{category}</td>
                <td>{price}$</td>
                <td>{quantity}</td>
                <td>{Number(price) * Number(quantity)}$</td>
                <td className='icons'>
                    <span>
                        <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color='purple'/>
                        </Link>
                    </span>
                    <span>
                        <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={25} color='green'/>
                        </Link>
                    </span>
                    <span>
                        <FaTrashAlt size={25} color='red' onClick={() => confirmDelete(_id)}/>
                    </span>
                </td>
            </tr>
        );
    });

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({products, search}))
    }, [search, products])

    return (  
        <div className='product-list'>
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span>
                        <h3>Inventory Items</h3>
                    </span>
                    <span>
                        <ProductSearch value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
                    </span>
                </div>
                {isLoading && <SpinnerImg />}

                <div className="table">
                    {!isLoading && products.length === 0 ? (
                    <p>-- No product found, please add a product...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eachProduct}
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='activePage'
                />
            </div>
        </div>
    );
}

export default ProductList;