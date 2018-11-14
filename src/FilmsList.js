import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './FilmsList.css';

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

class Film extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            hover: false,
            film: props.film,
            poster: (props.film.poster !== '') ? props.film.poster : 'https://dummyimage.com/360x275/fff/aaa' 
        };
                
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }     

    mouseOver(evt) {
        this.setState({hover: true});
    }

    mouseOut(evt) {
        this.setState({hover: false});       
    }
    
    render() {
        return (
            <Col xs={12} md={3} className="film" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
                <img src={this.state.poster} alt={this.state.title} />
                {this.state.hover ? (<FilmDetails film={this.state.film} />) : null}
            </Col>
        );
    }
}

function FilmDetails(props) { 
    return (
        <Col xs={12} className="film-details">
            <div class="film-details-inner">
                <div className="film-title"><h3>{props.film.title}</h3></div>
                <div className="film-year">Year: {props.film.year}</div>
                <div className="film-actor">Actor: {props.film.actor}</div>  
                <div className="film-director">Director: {props.film.director}</div>
            </div>
        </Col>    
    );
}

function FilmFilters(props) {
    var actors = window.BondData.actors;
    var directors = window.BondData.directors;
    var villans = window.BondData.villans;
    
    function updateTitle(evt) {
        props.updateFormState({currentTitle: evt.target.value});   
    }

    function updateActor(evt) {
        props.updateFormState({currentActor: evt.target.value});            
    }       

    function updateDirector(evt) {
        props.updateFormState({currentDirector: evt.target.value});            
    } 

    function updateVillan(evt) {
        props.updateFormState({currentVillan: evt.target.value});            
    } 

    function resetFilters(evt) {
        props.updateFormState({
            currentTitle: '',
            currentActor: '' ,
            currentDirector: '',
            currentVillan: '' 
        });          
    }  
    
    return (
        <form action="" className="filter" id="film-filters">
            <div className="group">
				<label htmlFor="film-title">Title:</label>
				<input type="text" name="film_title" value="" placeholder="Film Title" id="film-title" value={props.currentTitle} onChange={updateTitle} />
			</div>
			
			<div className="group">
				<label htmlFor="film-actor">Actor:</label>
				<select name="film_actor" id="film-actor" value={props.currentActor} onChange={updateActor}>
				    <option value="">- Select -</option>
				    {actors.map(function(actor) {
    				    return (
        				    <option value={actor.key} key={actor.key}>
        				        {actor.display}
        				    </option>
    				    );
				    })}
				</select>
			</div>
			
			<div className="group">
				<label htmlFor="film-director">Director:</label>
				<select name="film_director" id="film-director" value={props.currentDirector} onChange={updateDirector}>
				    <option value="">- Select -</option>
				    {directors.map(function(director) {
    				    return (
        				    <option value={director.key} key={director.key}>
        				        {director.display}
        				    </option>
    				    );
				    })}
				</select>
			</div>

			<div className="group">
				<label htmlFor="film-villan">Villan:</label>
				<select name="film_villan" id="film-villan" value={props.currentVillan} onChange={updateVillan}>
				    <option value="">- Select -</option>
				    {villans.map(function(villan) {
    				    return (
        				    <option value={villan.key} key={villan.key}>
        				        {villan.display}
        				    </option>
    				    );
				    })}
				</select>
			</div>
			
			<div className="group">
				<input type="reset" className="reset" value="Reset" onClick={resetFilters} />
			</div>
        </form>            
    );
}

class FilmsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            films: window.BondData.films,
            currentTitle: '',
            currentActor: '',
            currentDirector: '',
            currentVillan: '', 
        };
        
        this.updateFormState = this.updateFormState.bind(this);
    }    

    updateFormState(obj) {
        this.setState(obj, this.updateFilmList);
    }
    
    updateFilmList() {
        var actor = '',
        director = '';
        
        for (var i=0; i < window.BondData.actors.length; i++) {
            if (this.state.currentActor === window.BondData.actors[i].key) {
                actor = window.BondData.actors[i].display;
                break;
            }           
        }       

        for (var i=0; i < window.BondData.directors.length; i++) {
            if (this.state.currentDirector === window.BondData.directors[i].key) {
                director = window.BondData.directors[i].display;
                break;
            }           
        } 
            
        var filteredFilms = window.BondData.films.filter(function(film) {            
            return (
              (this.state.currentTitle === "" || film.title.toLowerCase().indexOf(this.state.currentTitle.toLowerCase()) !== -1) &&
              (this.state.currentActor === "" || film.actor === actor) &&
              (this.state.currentDirector === "" || film.director === director)
            );
        }.bind(this));
    
        this.setState({
          films: filteredFilms
        });        
    }

    render() {
        return (
            <div className="films-list">
                <FilmFilters  currentTitle={this.state.currentTitle} currentActor={this.state.currentActor} currentDirector={this.state.currentDirector} currentVillan={this.state.currentVillan} updateFormState={this.updateFormState} />
                <Films films={this.state.films} />
            </div>
        );
    }
}

export default FilmsList;
