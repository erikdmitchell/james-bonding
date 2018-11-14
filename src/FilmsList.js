import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './FilmsList.css';

function Films(props) {    
    return (
        <Grid className="films">
            <Row className="film header-row">
                <Col xs={12} md={3} className="film-title">Title</Col>
                <Col xs={12} md={1} className="film-year">Year</Col>
                <Col xs={12} md={2} className="film-actor">Actor</Col>  
                <Col xs={12} md={2} className="film-director">Director</Col>                              
            </Row>
            
            {props.films.map(function(film) {
                return (
                    <Film key={film.id} film={film} />   
                )
            })}
        </Grid>  
    );
}

function Film(props) {
    var imgSrc = 'https://dummyimage.com/360x275/fff/aaa';
    
    if (props.film.poster !== '') {
        imgSrc = props.film.poster;   
    }
    
    return (
        <Row className="film" id={props.film.id}>
            <Col xs={12} md={3} className="film-title">{props.film.title}</Col>
            <Col xs={12} md={1} className="film-year">{props.film.year}</Col>
            <Col xs={12} md={2} className="film-actor">{props.film.actor}</Col>  
            <Col xs={12} md={2} className="film-director">{props.film.director}</Col>
            <img src={imgSrc} alt={props.film.title} />
        </Row>  
    );
}

function FilmFilters(props) {
    var actors = window.BondData.actors;
    
    function updateTitle(evt) {
        props.updateFormState({currentTitle: evt.target.value});   
    }

    function updateActor(evt) {
        props.updateFormState({currentActor: evt.target.value});            
    }       

    function resetFilters(evt) {
        props.updateFormState({
            currentTitle: '',
            currentActor: '' 
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
        };
        
        this.updateFormState = this.updateFormState.bind(this);
    }    

    updateFormState(obj) {
        this.setState(obj, this.updateFilmList);
    }
    
    updateFilmList() {
        var actor = '';
        
        for (var i=0; i < window.BondData.actors.length; i++) {
            if (this.state.currentActor === window.BondData.actors[i].key) {
                actor = window.BondData.actors[i].display;
                break;
            }           
        }       
            
        var filteredFilms = window.BondData.films.filter(function(film) {            
            return (
              (this.state.currentTitle === "" || film.title.toLowerCase().indexOf(this.state.currentTitle.toLowerCase()) !== -1) &&
              (this.state.currentActor === "" || film.actor === actor)
            );
        }.bind(this));
    
        this.setState({
          films: filteredFilms
        });        
    }

    render() {
        return (
            <div className="films-list">
                <FilmFilters  currentTitle={this.state.currentTitle} currentActor={this.state.currentActor} updateFormState={this.updateFormState} />
                <Films films={this.state.films} />
            </div>
        );
    }
}

export default FilmsList;
