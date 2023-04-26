import { ChangeEvent } from 'react';
import styles from './ProductSearch.module.scss';
import { BiSearch } from 'react-icons/bi';

function ProductSearch({value, onChange}: {value: string, onChange: (event: ChangeEvent<HTMLInputElement>) => void}) {
    return (  
        <div className={styles.search}>
            <BiSearch size={18} className={styles.icon}/>
            <input type='text' placeholder='Search product by name' value={value} onChange={onChange}/>
        </div>
    );
}

export default ProductSearch;