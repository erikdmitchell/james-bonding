import React, { Component } from 'react';
import '../assets/bond-data.js';
import './Bond.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FilmsList from '../FilmsList/FilmsList';
import Villans from '../Villans/Villans';

class Bond extends Component {
  render() {
    return (
      <Grid className="bond">
        <Row>
            <h1>James Bonding</h1>
        </Row>
        <Row>

        </Row>
        <Row>
            <Villans />
        </Row>
      </Grid>
    );
  }
}

export default Bond;
