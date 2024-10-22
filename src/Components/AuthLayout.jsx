import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
// Utility function to check if a cookie exists

function checkTokenCookie() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('token='));
}

export default function Protected({ children , authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        const isAuthenticated = checkTokenCookie();
        
        if (!isAuthenticated && authStatus !== authentication ) {
            navigate("/login");
        }

        setLoading(false);
    }, [navigate,authStatus]);

    return loading ? (
        <div className="loader">
            <h1>Loading...</h1>
        </div>
    ) : (
        <>{children}</>
    );
}