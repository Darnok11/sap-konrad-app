import React, { Component } from 'react';

/**
 * Lable of given actors in AddMovieForm cmp
 */
class LabelActors extends Component {
   constructor(props) {
      super(props);

      this.returnActors = this.returnActors.bind(this);
   }

   returnActors(actors) {
      if (actors) {
         // if there are actors show them
         return actors.map( (actor, index) => {
         // add special id for actors
            return <span className="sap-addmovie-actor" id={"sap-movie-actor-" + index} key={"actor-" + index}> + {actor} </span>; })
      }
      //else return empty string
      return "";
   }

   render() {
      const {
         text,
         actor,
         actors,
         handlerAddActor,
         handlerRemoveActor,
         handlerHandleChange } = this.props;

      return (
         <label> {text.actors}* <br/>

            <div className="sap-addmovie-actors-wrapper">
               {this.returnActors(actors)}
            </div>

            <input name="actor" type="text" value={actor} onChange={handlerHandleChange} maxLength="50"/> <br/>

            <div className="sap-addmovie-addactors-buttons">
               <button onClick={handlerAddActor}> + </button>
               <button onClick={handlerRemoveActor}> - </button>
            </div>
         </label>
      ); //return
   }
}


export default LabelActors;
