import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Authentication } from '../shared/AuthenticationContext';




class TopBar extends Component {

    static contextType = Authentication;
    



    render() {

        //const{ isLoggedIn, username, onLogoutSuccess} = this.props;
        const { state, onLogoutSuccess} = this.context;
        const { isLoggedIn, username} = state;
        let links = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );
        if(isLoggedIn){
            links = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/user/' + username}>{username}</Link>
                </li>
                <li className="nav-link" onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>Logout</li>
            </ul>
            )
        };
        return (
            <div className='shadow-lg bg-light mb-2'>
                <nav className="navbar navbar-expand-lg navbar-light container">
                    <Link className="navbar-brand" to="/">Jforce</Link>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                        {links}
                    </div>
                </nav>
            </div>

        );

    }
}

export default TopBar;