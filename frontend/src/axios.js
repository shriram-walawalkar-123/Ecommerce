import axios from 'axios';
import { baseURL } from './config/config';

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});



export default instance;