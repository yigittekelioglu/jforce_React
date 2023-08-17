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
                if (!currentUserRole) {
                    return <Redirect to="/login" />;
                }

                // Eğer kullanıcının rolü 'ADMIN' veya belirtilen role eşitse bu kontrolü geç
                if (currentUserRole.name === 'ADMIN' || currentUserRole.name === role) {
                    return <Component {...props} />;
                } else {
                    context.onLogoutSuccess();  // Kullanıcının oturumunu kapat
                    return <Redirect to="/login" />;
                }
                
            }}
        />
    );
}

export default ProtectedRoute;
