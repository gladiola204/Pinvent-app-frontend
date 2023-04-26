import { ChangeEvent, FormEvent, useState } from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import "./Contact.scss";
import Card from "../../components/card/Card";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from 'react-icons/go';
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

type IFormData = {
    subject: string,
    message: string
}

const initialState = {
    subject: '',
    message: '',
};

function Contact() {
    useRedirectLoggedOutUser('/login');
    const [formData, setFormData] = useState<IFormData>(initialState)

    const changeFormData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    }

    const sendEmail = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post( `${BACKEND_URL}/api/contact`, formData);
            setFormData({subject: '', message: ''});
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    return (  
        <div className="contact">
            <h3 className="--mt">Contact us</h3>
            <div className="section">
                <form onSubmit={sendEmail}>
                    <Card cardClass="card">
                        <label>Subject</label>
                        <input type="text" name="subject" required value={formData.subject} onChange={changeFormData}/>

                        <label>Message</label>
                        <textarea cols={30} rows={10} name="message" required value={formData.message} onChange={changeFormData}></textarea>

                        <button type="submit" className="--btn --btn-primary">Send message</button>
                    </Card>
                </form>

                <div className="details">
                    <Card cardClass="card2">
                        <h3>Our contact information</h3>
                        <p>Fill the form or contact us via other channels listed below:</p>

                        <div className="icons">
                            <span>
                                <FaPhoneAlt />
                                <p>+48 555 666 777</p>
                            </span>
                            <span>
                                <FaEnvelope />
                                <p>Support@invent.com</p>
                            </span>
                            <span>
                                <GoLocation />
                                <p>Rybnik, Polska</p>
                            </span>
                            <span>
                                <FaTwitter />
                                <p>@ZinoTrust</p>
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Contact;