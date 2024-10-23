import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function AuthenticationLayout({ children, authenticationRequired }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        // Check if token is present in local storage
        const token = sessionStorage.getItem('token');
        if (token) {
            dispatch(login(token)); // Hydrate Redux store with token from local storage
        }

        if(authenticationRequired && isLoggedIn !== authenticationRequired){
            navigate("/login")
        } else if(!authenticationRequired && isLoggedIn !== authenticationRequired){
            navigate("/dashboard")
        }
        
        setLoader(false);
    }, [isLoggedIn, navigate, authenticationRequired, dispatch]);



    useEffect(() => {
        //agar authentication ki jarurat hai aur user loged in nahi he to login page pe bhej do
        // login hona chainye aur login hai =true
        if(authenticationRequired && isLoggedIn !== authenticationRequired){
            navigate("/login")
        } else if(!authenticationRequired && isLoggedIn !== authenticationRequired){
            navigate("/dashboard")
        }
        setLoader(false)
    },
    [isLoggedIn, navigate,authenticationRequired])








    
    if (loader) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>{children}</div>
        );
    }
}

export default AuthenticationLayout;
