import * as React from 'react';
import { NavLink } from 'react-router-dom';


/* HOOK REACT EXAMPLE */
const Navbar = (props: NavbarProps) => {

    return (
        <nav className="nav justify-content-center align-items-center bg-light shadow p-2">
            <h4 className="display-4  col-md-7 mb-2 col-lg-6 text-center">Sam's Blog</h4>
            <div className="row justify-content-center align-items-center col-sm-12 col-md-6 col-lg-4 offset-lg-2">
            <NavLink to="/" className="btn btn-link mx-auto">Home</NavLink>
            <NavLink to="/add" className="btn btn-link mx-auto">Add Blog</NavLink>
            <NavLink to="/donate" className="btn btn-link mx-auto">Donate</NavLink>
            </div>
        </nav>
    );
};

interface NavbarProps { }

export default Navbar;