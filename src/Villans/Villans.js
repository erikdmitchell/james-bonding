import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './Villans.css';

function VillansList(props) {    
    return (        
        <Row className="villans-list">
            {props.villans.map(function(villan) {
                return (
                    <Villan key={villan.id} villan={villan} />   
                )
            })}
        </Row>  
    );
}

class Villan extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            villan: props.villan,
            image: (props.villan.image !== '') ? props.villan.image : 'https://dummyimage.com/360x275/fff/aaa'             
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
            <Col xs={12} sm={6} md={3} className="villan" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
                <img src={this.state.image} alt={this.state.title} />
                {this.state.hover ? (<VillanDetails villan={this.state.villan} />) : null}
            </Col>
        );
    }
}

class VillanDetails extends Component {
    constructor(props) {
        super(props);
               
        // gets films villan is in, then gets just (map) the film title.
        var Films = window.BondData.films.filter(function(film) {            
            return (
              (props.villan.films.indexOf(film.id) !== -1)
            );
        }).map(function(film) {
            return (film.title);
        });
        
        Films = Films.join(', ');
                      
        this.state = {
            villan: props.villan,
            films: Films
        };
    }
    
    render() {
        return (
            <Col xs={12} className="villan-details">
                <div className="villan-details-inner">
                    <div className="villan-name"><h3>{this.state.villan.display}</h3></div>
                    <div className="villan-films">Films: {this.state.films}</div>
                </div>
            </Col>  
        );
    }
}

function VillanFilters(props) {
    function updateVillan(evt) {
        props.updateFormState({currentVillan: evt.target.value});            
    } 

    function resetFilters(evt) {
        props.updateFormState({
            currentVillan: '' 
        });          
    }  
    
    return (
        <form action="" className="filter" id="villan-filters">
            <Col xs={12} sm={6} md={3} className="group">
				<label htmlFor="villan-name">Villan:</label>
				<input type="text" name="villan_name" value="" placeholder="Villan Name" id="villan-name" value={props.currentVillan} onChange={updateVillan} />
			</Col>
			
			<Col xs={12} sm={6} md={9} className="group pull-right">
				<input type="reset" className="reset" value="Reset" onClick={resetFilters} />
			</Col>
        </form>            
    );
}

class Villans extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            villans: window.BondData.villans,
            currentVillan: ''            
        };
        
        this.updateFormState = this.updateFormState.bind(this);
    }    

    updateFormState(obj) {
        this.setState(obj, this.updateVillanList);
    }

    updateVillanList() {
        var villansFiltered = window.BondData.villans.filter(function(villan) {            
            return (
              (this.state.currentVillan === "" || villan.display.toLowerCase().indexOf(this.state.currentVillan.toLowerCase()) !== -1)
            );
        }.bind(this));
   
        this.setState({
          villans: villansFiltered
        });        
    }    

    render() {
        return (
            <div className="villans">
                <VillanFilters currentVillan={this.state.currentVillan} updateFormState={this.updateFormState} />
                <VillansList villans={this.state.villans} />
            </div>
        );
    }
}

export default Villans;
