import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Main extends Component {
    render() {
        return (
            <div className="header">
                <div className="navigation">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/films">Films</NavLink>
                        </li>
                        <li>
                            <NavLink to="/villans">Villans</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Main;

