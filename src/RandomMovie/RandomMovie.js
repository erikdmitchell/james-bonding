import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './RandomMovie.css';

class Spinner extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            films: props.films,
        };
        
        this.spin = this.spin.bind(this);
    }  
    
    spin() {
        SpinMovies(this.state.films);
    }   
    
    render() {
        return (
            <Col xs={12} sm={4} smOffset={4}>
                <Row>
                    <Col xs={12}>
                        <button onClick={this.spin} className="spin-button pull-right">Spin</button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Wheel films={this.state.films} />
                    </Col>
                </Row>
            </Col>
        );
    }
}

function Wheel(props) {
    var filmCounter = 0;

    return (
        <div id="film-wheel">
            <ul className="film-list" id="film-list">
                {props.films.map(function(film) {
                    filmCounter++;
                    var id = "film-" + filmCounter;
                    
                    return (
                        <li className="film" id={id} key={film.id}><span><img src={film.poster} alt={film.title} /></span></li>   
                    )
                })}
            </ul>       
        </div>
    )
}

function SpinMovies(films) {  
    // set vars
    var totalFilms = films.length;
    
    // get random number
    var filmNumber = Math.floor(Math.random() * totalFilms + 1 );

    // scroll our list.
    scrollMoviesUL(filmNumber);         
}

function scrollMoviesUL(liNumber) {
    var id = "film-" + liNumber;
    var li = document.getElementById(id);
    var ul = li.parentNode;
    var listItem = ul.getElementsByTagName('li');

    // removes any existing active class.
    for (var i = 0; i < listItem.length; i++) {
        listItem[i].classList.remove('active');
    }

    // scroll into our view.
    li.scrollIntoView({  
        behavior: 'smooth' 
    });
    
    li.classList.add('active'); // add class.
}

class RandomMovie extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            films: window.BondData.films,
        };
    }    
    


    render() {
        return (
            <div className="films-list">
                <Spinner films={this.state.films} />
            </div>
        );
    }
}

export default RandomMovie;
