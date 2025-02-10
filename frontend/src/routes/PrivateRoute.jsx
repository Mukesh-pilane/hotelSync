import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/client/authStore';

const PrivateRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuthStore((state) => state);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return <Component />;
};

export default PrivateRoute;
