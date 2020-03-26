import React, {useState} from 'react';
import {Nav, Navbar, Container, Image, Dropdown} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from '../../store/actions/Users';

const menus = [
    {
        to: '/reports',
        title: 'Reports'
    },
    {
        to: '/users',
        title: 'Users'
    }
];

function Header() {

    const dispatch = useDispatch();

    function renderMenu(links) {
        if (links && links.length) {
            return links.map((link, index) => {
                return <NavLink to={link.to}
                                className="nav-link"
                                activeClassName="nav-link-active">
                    {link.title}
                </NavLink>
            })
        }
        return null
    }

    const user = useSelector(({users}) => users.user);

    function name(name = 'x z') {
        if (name) {
            let initials = name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials
        }
        return '';
    };

    function logoutFunc() {
        dispatch(logout())
    }

    return (
        <div className="c-header">
            <Navbar variant="light">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <Image src={require('../../assets/images/logo.png')}/>
                        </Link>
                    </Navbar.Brand>

                    {(user && user.type) === 'admin' ? <Nav className="ml-auto c-nav">
                        {renderMenu(menus)}
                    </Nav> : null}

                    <Dropdown className="user-menu">
                        <Dropdown.Toggle id="dropdown-basic">
                            <div className="user-info">

                                <div className="user-name">
                                    <span>{name(user.type)}</span>
                                </div>
                                <div className="user-email-and-name">
                                    <span>{user.full_name}</span>
                                    <span>{user.email_address}</span>
                                </div>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => logoutFunc()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
