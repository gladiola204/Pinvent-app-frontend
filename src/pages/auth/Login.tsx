import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
    email: '',
    password: '',
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { email, password } = formData;

    const changeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    }

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email || !password || password.trim() === '') {
            return toast.error('All fields are required');
        };
        if(password.length < 6) {
            return toast.error("Password must be up to 6 characters")
        };
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email")
        };

        const userData = {
            email, password
        };

        setIsLoading(true);

        try {
            const data = await loginUser(userData);
            
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
                        <BiLogIn size={35} color='#999'/>
                    </div>

                    <h2>Login</h2>

                    <form onSubmit={login}>
                        <input type="email" placeholder='Email' required name='email' value={email} onChange={changeFormData}/>
                        <input type="password" placeholder='Password' required name='password' value={password} onChange={changeFormData}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                    </form>
                    <Link to='/forgot'>Forgot Password</Link>

                    <span className={styles.register}>
                        <Link to='/'>Home</Link>
                        <p>&nbsp; Don't have an account? &nbsp;</p>
                        <Link to='/register'>Register</Link>
                    </span>
                </div>
            </Card>
        </div>
    );
}

export default Login;