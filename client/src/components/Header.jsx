import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/favicon.png';

function Header() {
    return (
        <header>
            <Link to="/" className='logo'>
                <img src={logo} className='applogo' alt='Digital Books Logo' /> Digital Books
            </Link>

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}

export default Header