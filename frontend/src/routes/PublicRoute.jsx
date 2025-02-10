import React from 'react';
import { Navigate } from 'react-router-dom';
import PublicLayout from '../components/layouts/PublicLayout/PublicLayout';
import { useAuthStore } from '../store/client/authStore';

const PublicRoute = ({ component }) => {
    const { isAuthenticated } = useAuthStore((state) => state);
    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }
    return <PublicLayout component={component} />
};

export default PublicRoute;
