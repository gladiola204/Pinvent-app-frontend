import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import { forgotPassword, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';

function Forgot() {
    const [emailInput, setEmailInput] = useState('');

    const changeEmailInput = (event: ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value);

    const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailInput) {
            return toast.error('Please enter an email');
        };
        if (!validateEmail(emailInput)) {
            return toast.error("Please enter a valid email");
        };

        const userData = {
            email: emailInput,
        }

        await forgotPassword(userData);
        setEmailInput('');
    }

    return (  
        <div className={`container ${styles.auth}`}>
            <Card cardClass='coś'>
                <div className={styles.form}>
                    <div className="--flex-center">
                        <AiOutlineMail size={35} color='#999'/>
                    </div>

                    <h2>Forgot password</h2>

                    <form onSubmit={sendEmail}>
                        <input type="email" placeholder='Email' required name='email' value={emailInput} onChange={changeEmailInput}/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>

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

export default Forgot;