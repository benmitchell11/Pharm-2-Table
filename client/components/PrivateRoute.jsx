import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
};

export default PrivateRoute;
