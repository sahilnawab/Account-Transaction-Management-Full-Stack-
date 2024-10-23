import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        const fetchUserData = async () => {
            
            console.log("token is",token);
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:8080/api/user/all-users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <h1>User Data</h1>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default UserData;
