import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users`;

interface userDataType {
    name: string,
    email: string
    password: string,
}

export function validateEmail(email: string) {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export async function registerUser(userData:userDataType) {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);

        if(response.statusText === 'Created') {
            toast.success("User registered succesfully");
        }
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function loginUser(userData: {email: string, password: string}) {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);

        if(response.statusText === 'OK') {
            toast.success("User logged in succesfully");
        }
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function logoutUser() {
    try {
        await axios.get(`${API_URL}/logout`);
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function forgotPassword(userData: {email: string}) {
    try {
        const response = await axios.post(`${API_URL}/forgotpassword`, userData);

        toast.success(response.data.message);
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function resetPassword(userData: {newPassword: string}, resetToken: string) {
    try {
        const response = await axios.put(`${API_URL}/resetpassword/${resetToken}`, userData);

        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function getUserStatus() {
    try {
        const response = await axios.get(`${API_URL}/loggedin`);
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function getUser() {
    try {
        const response = await axios.get(`${API_URL}/getuser`);
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function updateUser(formData: {name: string, phone: string, bio: string, photo: string}) {
    try {
        const response = await axios.patch(`${API_URL}/updateuser`, formData);
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};

export async function updatePassword(formData: {oldPassword: string, newPassword: string}) {
    try {
        const response = await axios.patch(`${API_URL}/changepassword`, formData);
        return response.data;
    } catch (error: any) {
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.error(message);
    }
};