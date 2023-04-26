import { ChangeEvent, FormEvent, useState } from 'react';
import './ChangePassword.scss';
import { toast } from 'react-toastify';
import { updatePassword } from '../../services/authService';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';

const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

function ChangePassword() {
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, newPassword, confirmNewPassword } = formData;
    const navigate = useNavigate();

    const changeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    };

    const changePassword = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if( newPassword.trim() === '' || newPassword.length < 6) {
            return toast.error("New password has to be at least 6 characters long")
        }
        if(newPassword.trim() !== confirmNewPassword.trim()) {
            return toast.error("New passwords do not match")
        }

        const formData = {
            oldPassword,
            newPassword,
        }

        const response = await updatePassword(formData);
        toast.success(response);
        navigate('/profile');
    }

    return (  
        <div className='change-password'>
            <Card cardClass='password'>
                <h3>Change password</h3>
                <form onSubmit={changePassword} className='--form-control'>
                    <input type="password" required name='oldPassword' value={formData.oldPassword} onChange={changeFormData} placeholder='Old password'/>
                    <input type="password" required name='newPassword' value={formData.newPassword} onChange={changeFormData} placeholder='New password'/>
                    <input type="password" required name='confirmNewPassword' value={formData.confirmNewPassword} onChange={changeFormData} placeholder='confirm new password'/>

                    <button type='submit' className='--btn --btn-primary'>Change password</button>
                </form>
            </Card>
        </div>
    );
}

export default ChangePassword;