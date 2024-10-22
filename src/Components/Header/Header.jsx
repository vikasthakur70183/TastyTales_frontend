import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/authslice';
import Logo from '/Header/logo.svg'; // Adjust the path accordingly
import './Header.css';
import authService from '../../routes/Auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';``

function Header() {
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth.status);
    const [isLogged, setIsLogged] = useState(false);
    const token = authService.getCurrentUser();

    useEffect(() => {
        setIsLogged(authStatus);
    }, [token]);

    const logoutHandler = () => {
        authService.logout()
            .then(() => dispatch(logout()))
            .catch(error => console.error('Logout failed:', error));
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Define arrays of objects for dropdown menu links
    const loggedInLinks = [
        { to: '/home', text: 'Home', onClick: () => setIsMenuOpen(false), className: 'links' },
        { to: '/search', text: 'Search Recipe', onClick: () => setIsMenuOpen(false), className: 'links' },
        { to: '/profile', text: 'Profile', onClick: () => setIsMenuOpen(false), className: 'links' },
        { to: '/', text: 'Logout', onClick: logoutHandler, className: 'links action_btn' },
    ];

    const loggedOutLinks = [
        { to: '/', text: 'Home', onClick: () => setIsMenuOpen(false), className: 'links' },
        { to: '/login', text: 'Login', onClick: () => setIsMenuOpen(false), className: 'links' },
        { to: '/about', text: 'About us', onClick: () => setIsMenuOpen(false), className: 'links' },
    ];

    return (
        <>
            {isLogged ? (
                <header>
                    <div className="navbar">
                        <div className="logo">
                            <img className="logo" src={Logo} alt="Tasty Tales Logo" />
                        </div>
                        <ul className="links">
                            {loggedInLinks.map((link) => (
                                <li key={link.to}>
                                    <Link className={link.className} to={link.to} onClick={link.onClick}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="toggle_btn" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </div>

                    <div className={isMenuOpen ? 'dropdown_menu open' : 'dropdown_menu'}>
                        <ul>
                            {loggedInLinks.map((link) => (
                                <li key={link.to}>
                                    <Link className={link.className} to={link.to} onClick={link.onClick}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>
            ) : (
                <header>
                    <div className="navbar">
                        <div className="logo">
                            <img className="logo" src={Logo} alt="Tasty Tales Logo" />
                        </div>
                        <ul className="links">
                            {/* Links for unauthenticated users can go here (optional)  */}
                            {loggedOutLinks.map((link) => (
                                <li key={link.to}>
                                    <Link className={link.className} to={link.to}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="toggle_btn" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </div>
                    <div className={isMenuOpen ? 'dropdown_menu open' : 'dropdown_menu'}>
                        <ul>
                            {loggedOutLinks.map((link) => (
                                <li key={link.to}>
                                    <Link className={link.className} to={link.to} onClick={link.onClick}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>
            )}
        </>
    );
}

export default Header;
