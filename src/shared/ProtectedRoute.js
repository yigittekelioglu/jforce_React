import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Authentication } from '../shared/AuthenticationContext';

const ProtectedRoute = ({component: Component, role, ...rest}) => {
    const context = React.useContext(Authentication);
    const currentUserRole = context.state.role;

    


    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUserRole) 
                {
                    return <Redirect to="/login" />;
                }
                if (currentUserRole.name === 'ADMIN' || currentUserRole.name === role) {
                    return <Component {...props} />;
                } 
                else {
                    context.onLogoutSuccess();  
                    return <Redirect to="/login" />;
                }
                
            }}
        />
    );
}

export default ProtectedRoute;
