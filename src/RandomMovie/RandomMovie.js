import React, { Component } from 'react';
//import Row from 'react-bootstrap/lib/Row';
//import Col from 'react-bootstrap/lib/Col';
import './RandomMovie.css';

/*
function Films(props) {    
    return (        
        <Row className="films">
            {props.films.map(function(film) {
                return (
                    <Film key={film.id} film={film} />   
                )
            })}
        </Row>  
    );
}
*/

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
            <div>
                <button onClick={this.spin}>Spinner</button>
                <Wheel films={this.state.films} />
            </div>
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
                    return (
                        <li className="film" id={filmCounter} key={film.id}><span>{film.title}</span></li>   
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

function scrollMoviesUL(id) {
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
