import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, confirmPassword } = formData;

    const changeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    }

    const register = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!name || !email || !password || name.trim() === '' || password.trim() === '') {
            return toast.error('All fields are required');
        };
        if(password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        };
        if(password !== confirmPassword) {
            return toast.error("Passwords do not match")
        };
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email")
        };

        const userData = {
            name, email, password
        };

        setIsLoading(true);

        try {
            const data = await registerUser(userData);
            
            dispatch(SET_LOGIN(true));
            dispatch(SET_NAME(data.name));
            navigate('/dashboard');

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }
    
    return (  
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card cardClass='coś'>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <TiUserAddOutline size={35} color='#999'/>
                    </div>

                    <h2>Register</h2>

                    <form onSubmit={register}>
                        <input type="text" placeholder='Name' required name='name' value={name} onChange={changeFormData}/>
                        <input type="email" placeholder='Email' required name='email' value={email} onChange={changeFormData}/>
                        <input type="password" placeholder='Password' required name='password' value={password} onChange={changeFormData}/>
                        <input type="password" placeholder='Confirm Password' required name='confirmPassword' value={confirmPassword} onChange={changeFormData}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                    </form>

                    <span className={styles.register}>
                        <Link to='/'>Home</Link>
                        <p>&nbsp; Already have an account? &nbsp;</p>
                        <Link to='/login'>Login</Link>
                    </span>
                </div>
            </Card>
        </div>
    );
}

export default Register;