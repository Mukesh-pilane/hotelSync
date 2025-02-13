import React, { Suspense } from 'react';
import { getToken } from "../utility";
import { Navigate } from 'react-router-dom';
import Loader from '../components/shared/Loader/Loader'

const PrivateRoute = ({ component: Component }) => {
    const token = getToken();

    // If the token is not present, navigate to the login page
    // if (!token) {
    //     return <Navigate to={"/login"} />;
    // }
    return (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    )
};

export default PrivateRoute;
