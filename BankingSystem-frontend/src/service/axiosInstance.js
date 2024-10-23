import axios from 'axios';
import { logout } from '../store/authSlice'; // Import logout action
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const axiosInstance = axios.create();


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const dispatch = useDispatch();
            // Token is expired or invalid, handle it here
            dispatch(logout());
            const navigate = useNavigate();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
