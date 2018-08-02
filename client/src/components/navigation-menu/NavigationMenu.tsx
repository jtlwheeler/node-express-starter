import * as React from 'react';
import {Link} from 'react-router-dom';

const NavigationMenu = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">Navbar</Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default NavigationMenu;