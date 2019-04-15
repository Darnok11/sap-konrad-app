import React, {Component} from 'react';
import '../css/AddMovie.css';

class AddMovie extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         rating: 0.00,
         director: "",
         actor: "",
         actors: [],
         createdAt: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addActor = this.addActor.bind(this);
   }

   componentWillUpdate(nextProps, nextState) {

      console.log("cmp will update: ", nextState.createdAt );
   }

   componentWillMount() {
      // check if createdAt is preserved?
         console.log("Component will mount", this.state.createdAt);
   }

   addActor(e) {
      e.preventDefault();
      // clone array
      // adding actor to actors
      let actors = [ ...this.state.actors, this.state.actor ];
      this.setState({
         actors: actors,
         actor: ""
      });
   }

   handleChange(e) {
      const target = e.target;
      const value =  target.value;
      const name = target.name;

      this.setState({[name]: value});
      // NOTE: computed property name: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
   }

   createISODate() {
      let createdAt = new Date().toISOString();

      //checking all conditions !!!

      // remove Z from createdAt in extended UTC in ISO 8601 if this format still have it
      if (/Z/.test(createdAt) && createdAt.indexOf('Z') === createdAt.length - 1) { //test if contain Z
         createdAt = createdAt.substring(0, createdAt.length - 1); // chop last letter Z

      }
      // NOTE: if the norm changed still add creation date as UTC in ISO 8601
      return createdAt;
   }

   checkTitle() {

   }

   checkActors() {

   }

   checkRating() {

   }

   handleSubmit(e) {
      e.preventDefault();

      // setting paramiters or directly call CRUD action
      this.setState({
         createdAt: this.createISODate()
      });
   }

   render() {
      return (
      <form onSubmit={this.handleSubmit} className="sap-addmovie-form">

         <label>
            Title: <input name="title" type="text" value={this.state.title} onChange={this.handleChange} maxLength="50" />
         </label>

         <br/>

         <label>
            Rating: <input name="rating" type="text" value={this.state.rating} onChange={this.handleChange} maxLength="4"  />
         </label>

         <br/>

         <label>

            Actors: <input name="actor" type="text" value={this.state.actor} onChange={this.handleChange} maxLength="50" />
             <button onClick={this.addActor}> + </button>
             {this.state.actors.map( (actor, index ) => <p key={index + Math.random()}>{actor}</p> )}
         </label>

         <br/>

         <input type="submit" value="Submit"/>
      </form>);
   }
}

export default AddMovie;
