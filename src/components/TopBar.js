import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TopBar extends Component {
    render() {
        return (
            <div className='shadow-lg bg-light mb-2'>
                <nav className="navbar navbar-expand-lg navbar-light  container">
                <Link className="navbar-brand " to="/">Jforce</Link>
                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item ">
                        <Link className="nav-link" to="/">Home </Link>
                    </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item ">
                        <Link className="nav-link" to="/signup">Sign Up </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/login">Login </Link>
                    </li>
                    {/*
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>*/}
                    </ul>
                </div>
                </nav>
            </div>
            
        );
    }
}

export default TopBar;