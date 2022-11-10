import React from "react";
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

const Navbar = ({brand, buttonLink}) => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className="navbar-brand">{brand}</Link>
                <Link to='/graphics' className="navbar-brand">Graficos</Link>
            </div>
            
        </nav>
    )
}

export default Navbar;