import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
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
        SpinWheel(this.state.films);
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
            <div id="inner-wheel">
                {props.films.map(function(film) {
                    filmCounter++;
                    return (
                        <div className="film" id={filmCounter} key={film.id}><span>{film.title}</span></div>   
                    )
                })}
            </div>       
        </div>
    )
}

/*
function FilmDetails(props) { 
    return (
        <Col xs={12} className="film-details">
            <div className="film-details-inner">
                <div className="film-title"><h3>{props.film.title}</h3></div>
                <div className="film-year">Year: {props.film.year}</div>
                <div className="film-actor">Actor: {props.film.actor}</div>  
                <div className="film-director">Director: {props.film.director}</div>
            </div>
        </Col>    
    );
}
*/

function SpinWheel(films) {  
    // set vars
    var totalFilms = films.length;
    
    // get random number
    var filmNumber = Math.floor(Math.random() * totalFilms + 1 );
    
    var filmCounter = 0;
    
    var delay = 1000;
    
    for (var f=0; f < totalFilms; f++) { 
        var prevID = filmCounter;
        var id = filmCounter++;
                
        UpdateClassLoop(id, prevID);
        
        if (filmNumber === filmCounter) { 
            console.log('stop');
            break;
        }         
    }
    
console.log(filmNumber);
    
/*
    for (var f=0; f < totalFilms; f++) {  
        var prevID = filmCounter;
        var id = filmCounter++;
        
        if (prevID != 0) {
            document.getElementById(prevID).classList.remove('active');
        }
            
        document.getElementById(filmCounter).classList.add('active');
                 
        if (filmNumber === filmCounter) { 
            
console.log('stop');
            break;
        }           
    }
*/    
    
}

function UpdateClassLoop(id, prevID) {
    setTimeout(function() {
console.log(id + ' | ' + prevID);
        
        if (prevID != 0) {
            document.getElementById(prevID).classList.remove('active');
        }
            
        document.getElementById(id).classList.add('active');
    }, 1000)
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
