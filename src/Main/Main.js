import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import '../assets/bond-data.js';
import './Main.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Bond from '../Bond/Bond';
import FilmsList from '../FilmsList/FilmsList';
import Villans from '../Villans/Villans';

class Main extends Component {
    render() {
        return (
            <div className="bond">
                <Header />
                <Grid className="content">
                    <Row>
                        <Route exact path="/" component={Bond} />
                        <Route path="/films" component={FilmsList} />
                        <Route path="/villans" component={Villans} />
                    </Row>
                </Grid>
                <Footer />
            </div>
        );
    }
}

export default Main;

