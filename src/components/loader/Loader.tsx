import './Loader.scss';
import loaderImg from '../../assets/loader.gif';
import { createPortal } from 'react-dom';

export function Loader() {
        return createPortal(  
            <div className='wrapper'>
                <div className="loader">
                    <img src={loaderImg} alt="Loading..." />
                </div>
            </div>,
            document.getElementById('loader')!
        );
}

export function SpinnerImg() {
    return (
        <div className="--center-all">
            <div className="loader">
                <img src={loaderImg} alt="Loading..." />
            </div>
        </div>
    )
}

export default Loader;