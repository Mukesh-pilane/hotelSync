import React from 'react';
import { getToken } from "../utility"; 
import { Navigate } from 'react-router-dom';
import PublicLayout from '../components/layouts/PublicLayout/PublicLayout';

const PublicRoute = ({ component }) => {
    const token = getToken();
    if (token) {
        return <Navigate to={"/"} />;
    }
    return <PublicLayout component={component} />
};

export default PublicRoute;
