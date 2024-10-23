// src/components/Login.js
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, CircularProgress } from '@mui/material';
import axiosInstance from '../service/axiosInstance';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useState } from 'react';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('http://localhost:8080/api/v1/auth/authenticate', data);
            const token = response.data.token;
            dispatch(login(token));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoading(false);
        }
    
    };
// TODO:add validation for email and password
// TODO: Add loader while login
// TODO: Add error message if login fails
// TODO: Add a link to register
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-96 h-auto rounded-lg shadow-lg p-6">
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h2>Login</h2>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Email" variant="outlined" fullWidth />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Password" type="password" variant="outlined" fullWidth />}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
