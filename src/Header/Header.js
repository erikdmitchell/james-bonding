import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './Header.css';

class Main extends Component {
    render() {
        return (
            <div className="header">
                <Grid>
                    <Row className="header-wrap">
                        <Col xs={12} sm={3} className="logo">
                            <img src={require('../assets/images/007-logo-white.png')} alt="logo" />
                        </Col>
                        <Col xs={12} sm={9}>
                            <ul className="navigation">
                                <li>
                                    <NavLink exact={true} to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/films">Films</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/villans">Villans</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/movie">Find Your Film</NavLink>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Main;

