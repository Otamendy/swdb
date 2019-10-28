import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-services';
import Spinner from '../../components/spinner'

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: {},  
    loading: true 
  }
  updatePerson(){
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    this.swapiService
      .getPerson(personId)
      .then((person)=>{
        this.setState({ 
          person,
          loading: false
         })
      })
  }
  componentDidMount(){
    this.updatePerson()
  }
  componentDidUpdate(prevProps){
    if (this.props.personId !== prevProps.personid){
      this.updatePerson()
    }
  }
  
  render() {
    const { loading, person } = this.state
    const content = loading ? <Spinner /> : <DetailsView person={person} />
    return(
      <div className="person-details card">
         {content}
      </div>
    )
  }
}
const DetailsView = ({person}) =>{
  const { id, name, birthYear, eyeColor, gender } = person
  return <React.Fragment>
    <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="character" />
      <div className="card-body">
        <h4>{name} </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
  </React.Fragment>  
}