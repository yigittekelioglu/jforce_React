import React, { Component } from 'react';

export const Authentication = React.createContext();


class AuthenticationContext extends Component {


    state = {
        isLoggedIn: false,
        username: undefined,
        password: undefined,
        role: undefined
    };
    
    onLoginSuccess = authState =>{
        console.log(authState); 
        this.setState({
            ...authState,
            isLoggedIn: true
        })
    }
    
    onLogoutSuccess = () => {
        this.setState({
          isLoggedIn: false,
          username: undefined,
          role: undefined
        })
    }


    render() {
        return (
           <Authentication.Provider value={{
            state: {...this.state},
            onLoginSuccess: this.onLoginSuccess,
            onLogoutSuccess: this.onLogoutSuccess
           }}>
                {this.props.children}
           </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;