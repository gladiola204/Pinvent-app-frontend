import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { resetPassword } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';

const initialState = {
    password: '',
    confirmPassword: '',
};

function Reset() {
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams();
    const { password, confirmPassword } = formData;
    
    const changeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    };
    
    const reset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!resetToken) {
            navigate('/forgotPassword');
            return toast.error('Please click the reset link attached to email which we sent');
        }
        if(!password || password.trim() === '') {
            return toast.error('All fields are required');
        };
        if(password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        };
        if(password !== confirmPassword) {
            return toast.error("Passwords do not match")
        };

        const userData = {
            newPassword: password
        };

        setIsLoading(true);

        try {
            const data = await resetPassword(userData, resetToken);
            
            toast.success(data.message);
            navigate('/');

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (  
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card cardClass='coś'>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <MdPassword size={35} color='#999'/>
                    </div>

                    <h2>Reset password</h2>

                    <form onSubmit={reset}>
                        <input type="password" placeholder='New Password' required name='password' value={password} onChange={changeFormData} />
                        <input type="password" placeholder='Confirm New Password' required name='confirmPassword' value={confirmPassword} onChange={changeFormData}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>

                        <div className={styles.links}>
                            <p>
                                <Link to='/'>- Home</Link>
                            </p>
                            <p>
                                <Link to='/login'>- Login</Link>
                            </p>
                        </div>
                    </form>

                    
                </div>
            </Card>
        </div>
    );
}

export default Reset;