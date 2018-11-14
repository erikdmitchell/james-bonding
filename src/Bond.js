import React, { Component } from 'react';
import './assets/bond-data.js';
import './Bond.css';
import FilmsList from './FilmsList';

class Bond extends Component {
  render() {
    return (
      <div className="bond container">
        <h1>James Bonding</h1>
        <FilmsList />
      </div>
    );
  }
}

export default Bond;
