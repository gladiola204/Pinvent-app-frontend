import axios from 'axios';

const request = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    validateStatus: () => true,
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

export default request;