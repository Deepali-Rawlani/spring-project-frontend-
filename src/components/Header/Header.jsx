import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import './header.css';

const nav__links = [
    {
        path: '/home',
        display: 'Home',
    },
    {
        path: '/about-us',
        display: 'About Us',
    },
    {
        path: '/contact-us',
        display: 'Contact Us',
    },
   
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

   

    const logout = () => {
        navigate('/');
    };

    const stickyheaderFunc = () => {
        if (headerRef.current) {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', stickyheaderFunc);
        return () => window.removeEventListener('scroll', stickyheaderFunc);
    }, []);

    const toggleMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.toggle('show__menu');
        }
    };

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div
                        className="nav__wrapper d-flex align-items-center justify-content-between"
                    >
                        

                        <div>
                            <b id="nm">
                                Des<span id="nm2">tina</span>
                            </b>
                        </div>
                        

                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <ul className="menu d-flex align-items-center gap-5 no-bullets">
                                {nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) =>
                                                navClass.isActive ? 'active__link' : ''
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        

                        <div className="nav__right d-flex align-items-center gap-4">
                            <div className="nav__btns d-flex align-items-center gap-4">
                                <Button className="btn secondary__btn loginbtn">
                                    <Link to="/login" id="btn">Login</Link>
                                </Button>
                            </div>
                           

                            <span className="mobile__menu" onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
