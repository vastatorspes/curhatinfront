import { useState, Fragment } from 'react'
import { APP_NAME } from '../config'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth'
import NProgress from 'nprogress'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Router from 'next/router';

import '../node_modules/nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div >
            <Navbar color="light" light expand="md" style={{background: "linear-gradient(to right, #B993D6, #e99b97)"}}>
                <Link href="/">
                    <NavLink className="" style={{ cursor: "pointer", color:"#fff", fontSize:"20px" }}>
                        {APP_NAME}
                    </NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <Fragment>
                            <NavItem>
                                <Link href="/blogs">
                                    <NavLink style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                        Blogs
                                    </NavLink>
                                </Link>
                            </NavItem>                            
                        </Fragment>

                        {!isAuth() &&
                        <Fragment>
                            <NavItem>
                                <Link href="/signin">
                                    <NavLink style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                        Signin
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/signup">
                                    <NavLink style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                        Signup
                                    </NavLink>
                                </Link>
                            </NavItem>
                        </Fragment>}
                        {isAuth() && isAuth().role === 0 && (
                            <NavItem>
                                <Link href="/user">
                                    <NavLink style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                        Dashboard
                                    </NavLink>
                                </Link>
                            </NavItem>
                        )}
                        {isAuth() && isAuth().role === 1 && (
                            <NavItem>
                                <Link href="/admin">
                                <NavLink style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                    Dashboard
                                        </NavLink>
                                </Link>
                            </NavItem>
                        )}
                        {isAuth() && (
                            <NavItem>
                                <NavLink onClick={() => signout(() => Router.replace('/signin'))} style={{ cursor: "pointer", color:"#fff", fontSize:"16px" }}>
                                Signout
                                    </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;